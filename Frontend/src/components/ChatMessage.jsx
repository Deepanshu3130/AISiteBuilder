import { BotIcon, UserIcon } from "lucide-react";

function ChatMessage({ msg }) {

  const isUser = msg.role === "user";

  return (
    <div
      className={`flex items-start gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >

      {/* BOT ICON */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-linear-to-br from bg-indigo-600 flex items-center justify-center">
          <BotIcon className="size-5 text-white"/>
        </div>
      )}

      {/* MESSAGE BUBBLE */}
      <div
        className={`max-w-[80%] p-2 px-4 rounded-2xl shadow-sm text-sm mt-5 leading-relaxed ${
          isUser
            ? "bg-linear-to-r from-indigo-500 to-indigo-600 text-white rounded-tr-none"
            : "bg-gray-800 text-white rounded-tl-none"
        }`}
      >
        {msg.content}
      </div>

      {/* USER ICON */}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center">
          <UserIcon className="size-5 text-gray-700"/>
        </div>
      )}
    </div>
  );
}
export default ChatMessage