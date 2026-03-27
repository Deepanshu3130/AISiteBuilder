import { BotIcon } from "lucide-react";

function Loader() {
  return (
    <div className="flex items-start gap-3 mt-4 justify-start">

      <div className="w-8 h-8 rounded-full bg-liner-to-br-from-indigo-600 flex items-center justify-center">
        <BotIcon className="size-5 text-white"/>
      </div>

      <div className="flex gap-1.5 h-full items-end">
        <span className="size-2 rounded-full animate-bounce bg-gray-600 " style={{animationDelay :'0s'}}></span>
        <span className="size-2 rounded-full animate-bounce bg-gray-600 " style={{animationDelay :'0.2s'}}></span>
        <span className="size-2 rounded-full animate-bounce bg-gray-600 " style={{animationDelay :'0.4s'}}></span>
        
      </div>

    </div>
  );
}
export default Loader