import { useState, useEffect, useRef } from "react";
import SidebarLayout from "../components/slidebar";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";
import RefactorPreviewModal from "./Preview";
import { useParams } from "react-router-dom";
import { useCreateChat } from "../libs/hooks/chat/mutation";
import { useUser } from "../libs/stores/useUser";
import { useSession } from "../libs/stores/useSession";
import { useRefactorSSE, useRefactorSSEGet, useRepoHealthCheck } from "../libs/hooks/repoai/queries";
import { useAuthTokenQuery } from "../libs/hooks/auth/queries";
import { useStartRefactor, useConfirmPlan } from "../libs/hooks/repoai/mutation";
import { formatChatEvent } from "../libs/utils/formatChatEvent";

function ChatBox() {
  const [chatMessages, setChatMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeRefactorMsgId, setActiveRefactorMsgId] = useState(null);
  const [refactorSessionId, setRefactorSessionId] = useState(null);
  const [pendingConfirmPlan, setPendingConfirmPlan] = useState(null); // { planId }
  const chatEndRef = useRef(null); // ✅ ref for auto-scroll

  // Hardcoded example codes (later from backend)
  const originalCode = `data = request.get_json()
# Process the data
result = process_input(data['input'])
return jsonify({'status': 'success','result': result})`;

  const refactoredCode = `data = request.get_json()
if not data or 'input' not in data:
    raise BadRequest("Missing required 'input' field")
# Process the data
result = process_input(data['input'])
return jsonify({'status': 'success','result': result}), 200
except BadRequest as e:
    logger.warning(f"Bad request: {str(e)}")`;

  // 👋 Initial greeting
  useEffect(() => {
    setChatMessages([
      {
        message: "Hello! I'm your Repo AI assistant. How can I help you today?",
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);
  }, []);

  // ✅ Auto-scroll to bottom whenever chatMessages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  // 🧠 Handle user input
  const params = useParams();
  const createChat = useCreateChat();
  const user = useUser((s) => s.user);
  const session = useSession((s) => s.currentConversation);
  const currentRepo = useSession((s) => s.currentRepo);
  const currentBranch = useSession((s) => s.currentBranch);
  const authToken = useSession((s) => s.authToken);
  const setAuthToken = useSession((s) => s.setAuthToken);
  // repoai health check (disabled by default; we will trigger manually)
  const { refetch: refetchRepoaiHealth } = useRepoHealthCheck({
    enabled: false,
  });
  const { refetch: refetchAuthToken } = useAuthTokenQuery(undefined, {
    enabled: false,
  });
  const startRefactor = useStartRefactor();
  const confirmPlan = useConfirmPlan();
  const sseErrorShownRef = useRef(false);
  // const refactorSSE = useRefactorSSEGet(refactorSessionId, { enabled: !!refactorSessionId });
  const refactorSSEStream = useRefactorSSE(refactorSessionId, {
    enabled: !!refactorSessionId,
    // Show only messages coming from backend; never auto-close on terminal/named events
    isTerminalEvent: () => false,
    eventTypes: [],
    onMessage: (evt) => {
      const formatted = formatChatEvent(evt);
      setChatMessages(prev => [...prev, {
        message: formatted.text,
        sender: 'robot',
        kind: formatted.kind,
        meta: formatted.meta,
        id: crypto.randomUUID()
      }]);
      // If the backend indicates a plan requires confirmation, capture that intent
      const meta = formatted?.meta;
      if (meta?.requires_confirmation && (meta?.confirmation_type === 'plan' || !meta?.confirmation_type)) {
        const planId = meta?.data?.plan_id || null;
        setPendingConfirmPlan({ planId });
      }
    },
    // Suppress connection lifecycle messages in chat
    onOpen: () => { sseErrorShownRef.current = false; },
    onError: () => {},
    onClose: () => {},
    // No retries; just consume whatever the backend sends
    retry: { enabled: false },
    // No idle timeout so stream won't close from client side
    idleTimeoutMs: undefined,
  });

  console.log(chatMessages);

  const handleUserInput = async (text) => {
    const userMsg = { message: text, sender: "user", id: crypto.randomUUID() };
    setChatMessages((prev) => [...prev, userMsg]);

    // Determine conversation id: prefer route param convId, fallback to session
    const convId =
      params?.convId || params?.conversationId || params?.id || session?.id;

    // Build chat payload as requested: convoId (conv_id), chatId, gid (number), content, metadataJson
    const chatId = crypto.randomUUID();
    const gid = Number(user?.githubId || user?.id) || 0;
    const payload = {
      conv_id: convId,
      body: {
        chatId,
        gid,
        content: text,
        metadataJson: null,
      },
    };

    try {
      // fire-and-forget; you can await createChat.mutateAsync if you want to block
      await createChat.mutateAsync(payload);
    } catch (err) {
      console.error("Create chat message failed", err);
    }

    // If a plan confirmation is pending, send this text as the confirmation message instead of starting a new refactor
    if (pendingConfirmPlan && refactorSessionId) {
      try {
        await confirmPlan.mutateAsync({
          session_id: refactorSessionId,
          body: { session_id: refactorSessionId, user_response: text }
        });
        // optional: notify user that confirmation was sent
        setChatMessages(prev => [...prev, {
          message: "✅ Plan confirmation sent.",
          sender: 'robot',
          id: crypto.randomUUID()
        }]);
      } catch (err) {
        setChatMessages(prev => [...prev, {
          message: "❌ Failed to confirm plan. Please try again.",
          sender: 'robot',
          id: crypto.randomUUID()
        }]);
        console.error('Confirm plan failed', err);
      } finally {
        setPendingConfirmPlan(null);
      }
      return; // do not proceed to token/health/startRefactor
    }
    // First: call token API (query refetch) and persist to session store, then health check
    let fetchedToken = null;
    try {
      const { data: tokenData } = await refetchAuthToken();
      if (tokenData != null) {
        const token =
          tokenData?.accessToken ||
          tokenData?.token ||
          tokenData?.access_token ||
          (typeof tokenData === "string" ? tokenData : null);
        fetchedToken = token || null;
        if (fetchedToken) {
          try {
            setAuthToken(fetchedToken);
          } catch (_) {}
        } else {
          console.warn("Token endpoint returned empty payload", tokenData);
        }
      }
    } catch (tokErr) {
      console.error("Token generation failed", tokErr);
    }

    // After token, trigger a RepoAI health check
    try {
      await refetchRepoaiHealth();
    } catch (hcErr) {
      console.error("RepoAI health check failed", hcErr);
    }
    // Build start-refactor payload and call RepoAI
    try {
      const repository_url = currentRepo?.html_url;
      const branchName = currentBranch?.name;
      const userId = String(user?.githubId);
      // Prefer freshly fetched token, then store's latest, then the captured authToken from hook
      const accessToken =
        fetchedToken ||
        (useSession.getState && useSession.getState().authToken) ||
        authToken;

      const startPayload = {
        user_id: userId,
        user_prompt: text,
        github_credentials: {
          access_token: accessToken,
          repository_url,
          branch: branchName,
        },
        mode: "interactive-detailed",
      };

      const startRes = await startRefactor.mutateAsync(startPayload);
      // extract session id from response
      console.log("Start refactor response", startRes);
      const sid = startRes?.data?.session_id;
      if (sid) {
        setRefactorSessionId(sid);
        console.log("Refactor session started:", sid);
      } else {
        console.warn("Start refactor response missing session id", startRes);
      }
    } catch (startErr) {
      console.error("Start refactor failed", startErr);
    }
  };

  // 🧩 Handle “Show Preview” button click
  const handleShowPreview = (msgId) => {
    setActiveRefactorMsgId(msgId);
    setShowModal(true);
  };

  // 💾 Handle “Accept and Save”
  const handleAcceptAndSave = () => {
    const userMsg = {
      message: "Accept and Save",
      sender: "user",
      id: crypto.randomUUID(),
    };
    setChatMessages((prev) => [
      ...prev,
      userMsg,
      {
        message: "✅ Refactored code accepted and saved!",
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);
    console.log("Refactored code logged:", refactoredCode);
    setShowModal(false);
  };

  // ❌ Handle “Cancel”
  const handleCancel = () => {
    const userMsg = {
      message: "Cancel",
      sender: "user",
      id: crypto.randomUUID(),
    };
    setChatMessages((prev) => [
      ...prev,
      userMsg,
      {
        message: "❌ Refactor preview closed.",
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);
    console.log("Original code logged:", originalCode);
    setShowModal(false);
  };

  return (
    <SidebarLayout>
      <div className="flex flex-col h-screen bg-[#0d0d0d] text-white">
        {/* Scrollable chat area */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-6 space-y-4">
          {chatMessages.map((msg) => (
            <div key={msg.id} className="flex flex-col">
              <ChatMessages chatMessages={[msg]} />

              {/* Inline preview button only for AI refactor messages */}
              {msg.sender === "robot" && msg.action === "showPreview" && (
                <div className="flex justify-start mt-2 ml-12">
                  <button
                    onClick={() => handleShowPreview(msg.id)}
                    className="bg-[#FFA500] text-black font-semibold px-5 py-2 rounded-lg hover:bg-[#ffb733] transition-all duration-200"
                  >
                    Show Refactor Preview
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* ✅ Invisible scroll target for auto-scroll */}
          <div ref={chatEndRef} />
        </div>

        {/* Input at bottom */}
        <div className="sticky bottom-0 w-full">
          <ChatInput
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
            onSend={handleUserInput}
            placeholder={pendingConfirmPlan ? 'Type your confirmation message…' : 'Enter your prompt'}
          />
        </div>

        {/* Popup Modal */}
        {showModal && (
          <RefactorPreviewModal
            originalCode={originalCode}
            refactoredCode={refactoredCode}
            onAccept={handleAcceptAndSave}
            onCancel={handleCancel}
          />
        )}
      </div>
    </SidebarLayout>
  );
}

export default ChatBox;
