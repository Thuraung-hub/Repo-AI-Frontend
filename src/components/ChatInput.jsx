import { useState } from "react";
import { Chatbot } from "supersimpledev";

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function sendMessage() {
    if (!inputText.trim()) return;

    const newChatMessages = [
      ...chatMessages,
      { message: inputText, sender: "user", id: crypto.randomUUID() },
    ];

    setChatMessages(newChatMessages);

    const response = Chatbot.getResponse(inputText);

    setChatMessages([
      ...newChatMessages,
      { message: response, sender: "robot", id: crypto.randomUUID() },
    ]);

    setInputText("");
  }

  return (
    <div className="w-full bg-[#0d0d0d] border-t border-[#1f1f1f] px-6 py-4 flex items-center gap-3">
      <input
        type="text"
        placeholder="Enter your prompt"
        value={inputText}
        onChange={saveInputText}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        className="flex-1 bg-[#1a1a1a] text-gray-200 placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none"
      />
      <button
        onClick={sendMessage}
        className="bg-[#f5a623] hover:bg-[#e89920] text-black font-medium px-6 py-3 rounded-xl transition-all"
      >
        Send
      </button>
    </div>
  );
}
