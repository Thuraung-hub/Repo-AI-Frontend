import { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div
      ref={chatMessagesRef}
      className="flex flex-col overflow-y-auto px-6 py-6 bg-[#0d0d0d] h-full w-full border-t border-[#1f1f1f]"
    >
      {chatMessages.length === 0 ? (
        <p className="text-gray-500 text-center mt-48">
          Start your conversation 💬
        </p>
      ) : (
        chatMessages.map((chatMessage) => (
          <ChatMessage
            key={chatMessage.id}
            message={chatMessage.message}
            sender={chatMessage.sender}
            kind={chatMessage.kind}
            meta={chatMessage.meta}
          />
        ))
      )}
    </div>
  );
}

export default ChatMessages;
