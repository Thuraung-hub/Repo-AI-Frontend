import { useState } from "react";

export default function ChatInput({ chatMessages, setChatMessages, onSend, placeholder = "Enter your prompt" }) {
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (!inputText.trim()) return;

    if (onSend) {
      onSend(inputText); // call ChatBox handler
    }

    setInputText("");
  };

  return (
    <div className="w-full bg-[#0d0d0d] border-t border-[#1f1f1f] px-6 py-4 flex items-center gap-3">
      <input
        type="text"
        placeholder={placeholder}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        className="flex-1 bg-[#1a1a1a] text-gray-200 placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none"
      />
      <button
        onClick={handleSend}
        className="bg-[#f5a623] hover:bg-[#e89920] text-black font-medium px-6 py-3 rounded-xl transition-all"
      >
        Send
      </button>
    </div>
  );
}
