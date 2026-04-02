import React, { useEffect, useReducer, useRef } from 'react'
 import ChatMessage from './ChatMessage'
 import VersionCard from './VersionCard'
 import Loader from './Loader'
import { Send, Loader2 } from "lucide-react";
import { useState } from "react";
import api from '../configs/axios';
import { toast } from 'sonner';
const SideBar = ({isMenuOpen , project , setProject , isGenerating , setIsGenerating}) => {
    const [message, setMessage] = useState("");

    const fetchProject = async()=>{
        try{
            const {data} = await api.get(`/api/user/project/${project.id}`)
            setProject(data.Project)
        }catch(e){
            toast.error(e?.response?.data?.message || e.message);
        }
    }


    const handleRevision = async(e) => {
      e.preventDefault();
                let interveral 
        // if (!message.trim() || isGenerating) return;
        try{
            setIsGenerating(true);
            interveral = setInterval(() => {
                fetchProject();
            }, 10000 );

            const {data} = await api.post(`/api/project/revision/${project.id}` , {message:message})
            fetchProject();  //why ?? again

            toast.success(data.message);
            setInput('');
            clearInterval(interveral)
            setIsGenerating(false)

        } catch(e) {
           setIsGenerating(false)
           toast.error(e?.response?.data?.message || e.message);
           clearInterval(interveral)
        }
   };
  const messageRef = useRef(null)
  useEffect(()=>{
    if(messageRef.current){
        messageRef.current.scrollIntoView({behavior:'smooth'})
    }
  },[project.conversation.length , isGenerating])

  return (
<div className ={`h-full sm:max-w-sm rounded-xl bg-gray-900 border-gray-800 transition-all duration-400 ease-in-out

              ${isMenuOpen ? 'max-sm:w-0 overflow-hidden ' : 'w-full'}`}>
       <div className='flex flex-col h-full'>
                {/* message container */}
            <div className='flex-1 overflow-y-auto no-scrollbar px-3 flex flex-col gap-4 '>
             {
                 [...project.conversation , project.versions].sort((a,b)=>{
                    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
                    
                }).map((item, index) => {

                    if ("content" in item) {
                    return <ChatMessage key={index} msg={item} />;
                    }

                    {/* return (
                    <VersionCard
                        key={index}
                        ver={item}
                        project={project}
                    />
                    ); */}
                })}
                <div ref={messageRef}></div>
            </div>
             
             {isGenerating && <Loader />}
            {/* input area */}
            
        <div className="p-3 border-t border-gray-800 bg-gray-900">

        <div className="flex items-end gap-2 bg-gray-800 rounded-xl px-3 py-2">

            {/* TEXTAREA */}
            <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your website or request changes"
            rows={3}
            className="flex-1 bg-transparent outline-none resize-none text-sm   focus:ring-indigo-500 text-white placeholder-gray-400 no-scrollbar"
            disabled={isGenerating}
            onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleRevision();
                }
            }}
            />

            {/* SEND BUTTON */}
            <button
            onClick={handleRevision}
            disabled={isGenerating || !message.trim()}
            className={`flex items-center justify-center w-9 h-9 rounded-lg
             transition
            ${
                isGenerating
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-gradient-to-r from-[#CB52D4] to-indigo-600 hover:opacity-90"
            }`}
            >

            {isGenerating ? (
                <Loader2 className="w-5 h-5 text-white animate-spin" />
            ) : (
                <Send className="w-5 h-5 text-white" />
            )}

            </button>

        </div>

        </div>
       </div>
    </div>
  )
}

export default SideBar