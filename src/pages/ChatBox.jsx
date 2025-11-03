import { useState } from 'react';

import { ChatInput } from '../components/ChatInput';
import ChatMessages from '../components/ChatMessages';


function ChatBox() {
  const [chatMessages, setChatMessages] = useState([{
    message: 'hello chatbot',
    sender: 'user',
    id: 'id1'
  }, {
    message: 'Hello! How can I help you?',
    sender: 'robot',
    id: 'id2'
  }, {
    message: 'can you get me todays date?',
    sender: 'user',
    id: 'id3'
  }, {
    message: 'Today is September 27',
    sender: 'robot',
    id: 'id4'
  }]);
  // const [chatMessages, setChatMessages] = array;
  // const chatMessages = array[0];
  // const setChatMessages = array[1];

  return (
    <div className="flex flex-col min-h-screen bg-[#0d0d0d] text-white">
      {/* Chat area fills all remaining space */}
      <div className="flex-1 flex flex-col justify-between">
        <ChatMessages chatMessages={chatMessages} />
      </div>

      {/* Input bar stays pinned at bottom */}
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default ChatBox;