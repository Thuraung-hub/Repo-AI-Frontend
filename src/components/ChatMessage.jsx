import RobotProfileImage from "../assets/robot.png";
import UserProfileImage from "../assets/user.png";

export function ChatMessage({ message, sender }) {
  const isUser = sender === "user";

  return (
    <div
      className={`flex items-end mb-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="flex flex-col items-start">
          <span className="text-xs text-gray-400 mb-1 ml-1">AI</span>
          <div className="max-w-[70%] bg-[#2b2b2b] text-white px-4 py-3 rounded-2xl rounded-bl-none shadow">
            {message}
          </div>
        </div>
      )}

      {isUser && (
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-400 mb-1 mr-1">User</span>
          <div className="max-w-[70%] bg-[#f5a623] text-black px-4 py-3 rounded-2xl rounded-br-none shadow">
            {message}
          </div>
        </div>
      )}
    </div>
  );
}
