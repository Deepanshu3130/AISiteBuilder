import {  ArrowBigDownDashIcon, EyeIcon, EyeOffIcon, FullscreenIcon, LaptopIcon, Loader2Icon,  MessageSquareIcon, SaveIcon, SmartphoneIcon, TabletIcon, XIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams , Link} from 'react-router-dom'
import SideBar from '../components/SideBar';
import ProjectPreview from '../components/ProjectPreview';
import { toast } from 'sonner';
import { authClient } from '../lib/auth-client';
import api from '../configs/axios';



// why settimeout , about not making the project as the sate varibale , scrool bar property , flex-1 warega ek baar .
//  useRef aand the scroll-to-view wali thing , and tailwinnd too , live changing property adn , see dowmloading logic
// see the flow of this is still not clear , but after writing the back see all the componets and things done in that properly
function Projects() {
  const {projectId} = useParams();
  const navigate = useNavigate();
  const [project , setProject] = useState(null);
  const [loading , setLoading] = useState(true);
  const [isGenerating , setIsGenerating] = useState(true);
  const [device , setDevice] = useState("laptop");
  const [isMenuOpen , setIsMenuOpen] = useState(false);
  const [isSaving  , IsSetSaving] = useState(false);
  const [toggle , settoggle] = useState(true)

  const fetchProject = async()=>{
   
       try{
        const {data} = await api.get(`/api/user/project/${projectId}`)
        console.log(data)
        
        setProject(data.Project);

        setIsGenerating(data.Project?.current_code ? false : true)
        setLoading(false)
       }catch(e){
        toast.error(e?.response?.data?.message || e.message);
       }

  }
  const {data:session , isPending} = authClient.useSession()

  useEffect(()=>{
    if(session?.user){
      fetchProject();
    }else if(!isPending && !session?.user){
      navigate("/");
      toast("Please login to view your project")
    }
  },[session?.user])


  useEffect(()=>{
    if(project && !project?.current_code){
      const intervalId = setInterval(fetchProject , 10000)
      return()=>{
        clearInterval(intervalId)
      }
    }

    
  },[project])


  const previewRef = useRef()


  const downloadCode = () => {

  // const code = previewRef.current?.getCode() || project?.current_code; //checkthis
  const code =  project?.current_code

  if(!code){
    if(isGenerating){
      return
    }
    return
  }
  const element = document.createElement('a');
  const file = new Blob([code], {type: "text/html"});
  element.href = URL.createObjectURL(file);
  element.download = "index.html";
  document.body.appendChild(element);
  element.click();
}

const togglePreview =()=>{
  const code = previewRef.current?.getCode() || project?.current_code
}

const togglePublish = async()=>{
  settoggle(!toggle)
  
  try{
    const {data } = await api.get(`/api/user/publish-toggle/${projectId}`);
    toast.success(data.message)
  }catch(e){
    toast.error('error occured at server side')
  }
}

  if(loading){
    return(
      <>
        <div className='flex items-center justify-center h-screen'>
          <Loader2Icon className=' animate-spin size-7 text-violet-200'></Loader2Icon>
        </div>
      </>
    )
  }

  return project ?  (
    <div className='flex flex-col h-screen w-full bg-gray-900 text-white'>
     {/* building the NavBar */}
     <div className='flex max-sm:flex-col sm:items-center gap-4 px-4 py-2 no-scrollbar bg-slate-950'>
        {/* left */}
      <div className='flex items-center gap-2 sm:min-w-90 text-nowrap'>
        <img src="/favicon.svg" alt="logo" className='h-5 cursor-pointer ' onClick={()=>navigate('/')} />
        <div className="max-w-64 sm:max-w-xs">
          <p className ='text-sm text-medium capitalize truncate'>{project.name}</p>
          <p className='text-xs text-gray-400 mt-0.5'>Previewing last saved version</p>
        </div>
        <div className='sm:hidden flex-1 flex justify-end'>
          {isMenuOpen ? <MessageSquareIcon onClick={()=>setIsMenuOpen(false)} className='size-6 cursor-pointer'/> :
          <XIcon onClick={()=>setIsMenuOpen(true)} className='size-6 cursor-pointer'/>}
        </div>
      </div>
      {/* miodle */}
      <div className='hidden sm:flex gap-2 bg-gray-950 p-1.5 rounded-md'>
        <SmartphoneIcon onClick={()=> setDevice('phone')}
         className={`size-6 p-1 rounded cursor-pointer ${device === 'phone' ? 'bg-gray-700' : ""}`}
         />
        <TabletIcon onClick={()=> setDevice('tablet')} 
        className={`size-6 p-1 rounded cursor-pointer ${device === 'tablet' ? 'bg-gray-700' : ""}`}/>

        <LaptopIcon onClick={()=> setDevice('laptop')}
         className={`size-6 p-1 rounded cursor-pointer ${device === 'laptop' ? 'bg-gray-700' : ""}`}/>
      </div>
       {/* right */}
      <div className ='flex items-center justify-end gap-3 flex-1 text-xs sm:text-sm ' >

      <button className='max-sm:hidden bg-gray-800 hover:bg-gray-700 text-white px-3.5 py-1
       flex items-center gap-2 rounded sm:rounded-sm transition-colors border border-gray-700'>
        <SaveIcon size={16}/>Save
      </button>

      <Link target ='_blank' to={`/preview/${projectId}`} 
      className=' bg-gray-800 hover:bg-gray-700 text-white px-3.5 py-1
       flex items-center gap-2 rounded sm:rounded-sm transition-colors border border-gray-700'>  
        <FullscreenIcon size={16}/> Preview
      </Link>

      <button  onClick={downloadCode}
      className=' bg-gray-800 hover:bg-gray-700 text-white px-3.5 py-1
       flex items-center gap-2 rounded sm:rounded-sm transition-colors border border-gray-700'>
        <ArrowBigDownDashIcon size={16} />
        Download
        </button>

      <button  className=' bg-gray-800 hover:bg-gray-700 text-white px-3.5 py-1
       flex items-center gap-2 rounded sm:rounded-sm transition-colors border border-gray-700' 
       onClick={togglePublish}>
       {!toggle? <EyeOffIcon size={16}/> : <EyeIcon size={16}/>}
      {!toggle ? "Unpublish" : "Publish"}
      </button>

      </div>
     </div> 
     <div className='flex-1 overflow-auto flex'>
       <div>
        <SideBar isMenuOpen={isMenuOpen} project={project} setProject={(p)=>setProject(p)} isGenerating={isGenerating} setIsGenerating={setIsGenerating} />
       </div>
       <div className={`flex-1 p-2 pl-1 ${isMenuOpen  ? 'block' : 'hidden'} sm:block`}>
        <ProjectPreview
         project={project} 
         isGenerating={isGenerating} 
         device={device}
          ref={previewRef}
         />
       </div>
     </div>
    </div>
  ) :(
    <div className='flex items-center justify-center h-screen'>
      <p className ='text-2xl font-medium text-gray-200'>Unable To Load Project</p>
    </div>
  )
}

export default Projects