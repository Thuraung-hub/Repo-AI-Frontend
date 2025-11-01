import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function RepoAIChat() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'User', text: 'Save Changes.' }, 
    { id: 2, sender: 'AI', text: 'Hello! How can I assist you with refactoring today?' },
   
    { id: 3, sender: 'User', text: 'Commit and push to a new branch.' },
    { id: 4, sender: 'AI', text: "I'll create a new branch and commit your changes.\n\nnew branch: `feature/improve-exception-handling`" },
    { id: 5, sender: 'AI', text: 'I have created a new branch and committed your changes.' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: 'User', text: inputValue }]);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen bg-[#121212] text-[#FFFFFF] font-sans ">
      <div className="flex-1 flex flex-col p-[1%]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex flex-col ${message.sender === 'User' ? 'items-end' : 'items-start'}`}>
              <div className="text-xs text-[#FFA500] mb-1">{message.sender}</div>
              <div
                className={`max-w-2xl px-6 py-3 rounded-2xl whitespace-pre-wrap ${
                  message.sender === 'User'
                    ? 'bg-[#FFA500] text-[#121212] font-medium px-[12px] py-[12px] rounded-[10px]'
                    : 'bg-[#212121] text-[#FFFFFF] px-[12px] py-[12px] rounded-[10px]'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-6   px-[6px] py-[2px] rounded-[10px]">
          <div className="flex items-center gap-3 bg-[#212121] rounded-xl p-3 px-[6px] py-[2px] rounded-[10px]">
            <input 
              type="text"
              placeholder="Enter your Prompt..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 text-[#FFFFFF] bg-[#212121] border-none outline-none   "
            />
            <button
              onClick={handleSend}
              className="bg-[#FFA500] text-black px-[6px] py-[2px] rounded-[10px] font-medium hover:bg-amber-400 transition flex items-center gap-2"
            >
              <Send size={20} />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
