import RobotProfileImage from "../assets/robot.png";
import UserProfileImage from "../assets/user.png";
import PlanSummaryCard from "./PlanSummaryCard";
import ValidationSummaryCard from "./ValidationSummaryCard";

export function ChatMessage({ message, sender, kind, meta }) {
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
          <div className="max-w-[70%] bg-[#2b2b2b] text-white px-4 py-3 rounded-2xl rounded-bl-none shadow whitespace-pre-wrap wrap-break-word">
            {message}
          </div>
          {/* Render plan summary if present */}
          {meta?.data?.plan_summary && (
            <div className="mt-2 max-w-[70%]">
              <PlanSummaryCard
                summary={meta.data.plan_summary}
                planId={meta.data.plan_id}
                totalSteps={meta.data.total_steps}
                requiresConfirmation={meta?.requires_confirmation}
                confirmationType={meta?.confirmation_type}
              />
            </div>
          )}

          {/* Render validation summary if present */}
          {meta?.data?.validation_summary && (
            <div className="mt-2 max-w-[70%]">
              <ValidationSummaryCard
                summary={meta.data.validation_summary}
                filesChanged={meta.data.files_changed}
                linesAdded={meta.data.lines_added}
                linesRemoved={meta.data.lines_removed}
                requiresConfirmation={meta?.requires_confirmation}
                confirmationType={meta?.confirmation_type}
              />
            </div>
          )}
        </div>
      )}

      {isUser && (
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-400 mb-1 mr-1">User</span>
          <div className="max-w-[70%] bg-[#f5a623] text-black px-4 py-3 rounded-2xl rounded-br-none shadow whitespace-pre-wrap wrap-break-word">
            {message}
          </div>
        </div>
      )}
    </div>
  );
}
