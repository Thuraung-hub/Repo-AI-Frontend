import { useState, useEffect, useRef } from "react";
import SidebarLayout from "../components/slidebar";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";
import RefactorPreviewModal from "./Preview";
import { useParams } from "react-router-dom";
import { useCreateChat } from "../libs/hooks/chat/mutation";
import { useUser } from "../libs/stores/useUser";
import { useSession } from "../libs/stores/useSession";

function ChatBox() {
  const [chatMessages, setChatMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeRefactorMsgId, setActiveRefactorMsgId] = useState(null);
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

  const handleUserInput = async (text) => {
    const userMsg = { message: text, sender: "user", id: crypto.randomUUID() };
    setChatMessages((prev) => [...prev, userMsg]);

    // Determine conversation id: prefer route param convId, fallback to session
    const convId = params?.convId || params?.conversationId || params?.id || session?.id;

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
      console.error('Create chat message failed', err);
    }

    const lowerText = text.toLowerCase();
    let aiMsg = null;

    if (lowerText.includes("improve")) {
      aiMsg = {
        message:
          "I've analyzed your code and prepared a refactored version. Click below to preview it.",
        sender: "robot",
        id: crypto.randomUUID(),
        action: "showPreview",
      };
      setActiveRefactorMsgId(aiMsg.id);
    } else if (lowerText.includes("commit") && lowerText.includes("push")) {
      aiMsg = {
        message: "✅ New branch created and changes committed successfully!",
        sender: "robot",
        id: crypto.randomUUID(),
      };
    } else if (["hi", "hey", "hello"].includes(lowerText)) {
      aiMsg = {
        message: "Hey there! 👋 How can I assist you today?",
        sender: "robot",
        id: crypto.randomUUID(),
      };
    } else {
      aiMsg = {
        message: `You said: "${text}"`,
        sender: "robot",
        id: crypto.randomUUID(),
      };
    }

    setChatMessages((prev) => [...prev, aiMsg]);
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
