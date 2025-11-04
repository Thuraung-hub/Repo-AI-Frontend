import { useState, useEffect } from "react";
import SidebarLayout from "../components/slidebar";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";
import RefactorPreviewModal from "./Preview";

function ChatBox() {
  const [chatMessages, setChatMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Hardcoded example codes
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

  // Start with greeting
  useEffect(() => {
    setChatMessages([
      {
        message: "Hello! I'm your Repo AI assistant. How can I help you today?",
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);
  }, []);

  const handleUserInput = (text) => {
    const userMessage = { message: text, sender: "user", id: crypto.randomUUID() };
    setChatMessages((prev) => [...prev, userMessage]);

    // Condition to trigger refactor popup
    if (text.toLowerCase().includes("improve")) {
      setShowModal(true);
      return;
    }

    // Normal replies
    const lowerText = text.toLowerCase();
    let aiResponse = "I'm here to help you.";

    if (["hi", "hey", "hello"].includes(lowerText)) {
      aiResponse = "Hey there! 👋 How can I assist you today?";
    } else {
      aiResponse = `You said: "${text}"`;
    }

    setChatMessages((prev) => [
      ...prev,
      { message: aiResponse, sender: "robot", id: crypto.randomUUID() },
    ]);
  };

  const handleAcceptAndSave = () => {
    const userMsg = {
      message: "Accept and Save",
      sender: "user",
      id: crypto.randomUUID(),
    };
    setChatMessages((prev) => [...prev, userMsg]);
    console.log("Refactored code logged:", refactoredCode);
    setShowModal(false);
  };

  const handleCancel = () => {
    const userMsg = {
      message: "Cancel",
      sender: "user",
      id: crypto.randomUUID(),
    };
    setChatMessages((prev) => [...prev, userMsg]);
    console.log("Original code logged:", originalCode);
    setShowModal(false);
  };

  return (
    <SidebarLayout>
      <div className="flex flex-col h-screen bg-[#0d0d0d] text-white">
        {/* Scrollable chat area */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-6">
          <ChatMessages chatMessages={chatMessages} />
        </div>

        {/* Fixed input at bottom */}
        <div className="sticky bottom-0 w-full">
          <ChatInput
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
            onSend={handleUserInput}
          />
        </div>

        {/* Popup modal */}
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
