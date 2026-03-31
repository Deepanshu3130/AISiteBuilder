import React, { useState } from 'react'
import instagram from "../assets/instagram.svg"
import netflix from "../assets/netflix.svg"
import hostinger from "../assets/hostinger.svg"
import vercel from "../assets/vercel.svg"
import youtube from "../assets/youtube.svg"
import {Loader2Icon} from 'lucide-react'
import { authClient } from '../lib/auth-client'
import { toast} from 'sonner'
import api from '../configs/axios'
import { useNavigate } from 'react-router-dom'


function Home() {
  const [input, setInput] = useState();
  const[loading , setLoading] = useState(false)
  const {data : session} = authClient.useSession();
  const navigate = useNavigate()


  const onSubmitHandler = async(e)=>{
     e.preventDefault();
     try{
      if(!session?.user){
        return toast.error('please sign in to create a project')
      }else if(!input.trim()){
        return toast.error('please enter a message')
      }
      setLoading(true);

      const {data} = await api.post('/api/user/project' ,
        {
          initial_prompt : input
        }
      )
      setLoading(false)
      navigate(`/projects/${data.projectId}`)
     }catch(e){
      setLoading(false);
      toast.error(e?.response?.data?.message || e.message);
     }
  }


  return (

    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 flex flex-col items-center justify-center text-white px-4">

      {/* Top Badge */}
      <div className="border border-purple-500/30 rounded-full flex items-center gap-2 px-3 py-1 mb-8">
        <span className="bg-purple-600 px-2 py-0.5 rounded-md text-xs">
          NEW
        </span>
        <span className="text-sm opacity-80">
          Try 30 days free trial option
        </span>
      </div>

      {/* Heading Section */}
      <div className="max-w-4xl text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
          Turn thoughts into websites instantly, with AI.
        </h1>

        <p className="text-gray-300 max-w-xl mx-auto">
          Create, customize and present faster than ever with intelligent
          design powered by AI.
        </p>
      </div>

      {/* Input Section */}
          <form onSubmit={onSubmitHandler}
          className="bg-white/10 max-w-2xl w-full rounded-xl p-4 mt-10 border border-indigo-600/70 focus-within:ring-2 ring-indigo-500 transition-all">
          <textarea onChange={e => setInput(e.target.value)} value={input} className="bg-transparent outline-none text-gray-300 resize-none w-full" rows={4} placeholder="Describe your presentation in details" required />
          <button className="ml-auto flex items-center gap-2 bg-gradient-to-r from-[#CB52D4] to-indigo-600 rounded-md px-4 py-2">
            {loading ? (
              <>
                Creating <Loader2Icon className="animate-spin size-4 text-white"/>
              </>
             ):("Create with AI") }
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-16 mx-auto mt-16">
          <div className="w-full  mx-auto flex flex-wrap justify-center items-center gap-16 mt-16">
            <img className="h-18 md:h-20" src={instagram} />
            <img className="h-18 md:h-20" src={netflix} />
            <img className="h-18 md:h-20" src={vercel} />
            <img className="h-18 md:h-20" src={hostinger} />
            <img className="h-18 md:h-20" src={youtube} />
            <img className="h-18 md:h-20" src={youtube} />
            <img className="h-18 md:h-20" src={youtube} />
            <img className="h-18 md:h-20" src={youtube} />
         </div>

        </div>

    </div>
  )
}

export default Home