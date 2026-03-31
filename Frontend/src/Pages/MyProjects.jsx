import React, { useEffect, useState } from 'react'
import ProjectCard from '../components/ProjectCard';
import { PlusIcon , Loader2Icon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../configs/axios';
import { toast } from 'sonner';
import { authClient } from '../lib/auth-client';
import { use } from 'react';

function MyProjects() {
      const {data:session , isPending} = authClient.useSession()
  const navigate = useNavigate()
  const[loading , setLoading] = useState(true);
  const[projectData , setProjectData] = useState() // use it later state varible because will come to the page->useeffect will run-> project data will come-> then projectdata will be updated



  const fetchProjects = async()=>{
    try{
        const{data} = await api.get('/api/user/projects');
        setProjectData(data.Projects);
        setLoading(false)
    }catch(e){
         toast.error(e?.response?.data?.message || e.message);
    }
  }

   useEffect(()=>{
     if(session?.user){
      fetchProjects();
    }else if(!isPending && !session?.user){
      navigate("/");
      toast("Please login to view your project")
    }
   },[session?.user])



  const deleteProject = async(projectId)=>{
          try{
            const confirm = window.confirm('Are you sure you want to delete this project ?')
            if(!confirm){
                return
            }
            const{data} = await api.delete(`/api/project/${projectId}`);
            toast.success(data.message);
            fetchProjects()
        
    }catch(e){
         toast.error(e?.response?.data?.message || e.message);
    }
  }

  


  return (
   
      <>
        {loading ? (<div className='flex items-center justify-center h-[80vh]'>
        <Loader2Icon className ="size-7 animate-spin text-indigo-200"/>
      </div>) :
      !projectData?.length >0 ?(<div  className='flex flex-col items-center justify-center text-white h-[80vh] gap-7 '>
           <p className='text-2xl text-gray-300 font-semibold'>You have no projects yet...</p>
          <button onClick={()=> navigate('/')}
          className="px-6 py-2 bg-indigo-600 active:scale-95 hover:bg-indigo-700 transition rounded-md flex items-center justify-center gap-2"> <PlusIcon size={18}/> Create New</button>
      </div>):

      ( <div className='mt-8 max-w-[80%] mx-auto max-sm:max-w-[90%]'>     
             <div className='flex justify-between text-white'>
               <p className='text-2xl font-bold max-sm:text-lg'>My Projects</p>
               <button onClick={()=> navigate('/')}
               className="px-6 py-2 bg-indigo-600 active:scale-95 hover:bg-indigo-700 transition rounded-md flex items-center justify-center gap-2"> <PlusIcon size={18}/> create New</button>
             </div>

            <div className='flex mt-10 flex-wrap gap-4'>
              {projectData.map((project , index)=>{
                return <ProjectCard key={index} project ={project} deleteProject ={deleteProject}/>  // see changes in the card components if any soemthing iframe thing see this dont use the raw images 
                // and add the navigator to the live and preview button 
              })}
            </div>
      </div>)}
      </>

    
  )
}

export default MyProjects