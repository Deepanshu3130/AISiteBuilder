// import React from 'react'
// import thumbnail from "../assets/thumbnail (1).png"
// import { useLocation } from "react-router-dom";
 import { TrashIcon } from 'lucide-react';


// const ProjectCard = ({project}) => {
//     let location = useLocation()

//     const deleteProject =async(id)=>{

//     }
    
//   return (
//     <div className="w-full group  max-w-[300px] overflow-hidden flex flex-col relative  text-white border border-slate-800 rounded-xl mt-10 bg-[#0b1220] pb-5 mx-auto">
//        <div className='aspect-video w-full'>
//         <img className='w-full h-full object-cover' src={thumbnail}></img>
//        </div>

//        <div className="flex flex-col gap-2 p-4 bg-gradient-to-b from-[#0b1220] to-[#070b14]">
//          <p className="text-lg font-semibold leading-snug line-clamp-1 text-slate-300">{project.title}</p>
//          <p className=" text-sm leading-snug line-clamp-2 text-slate-500 ">{project.description}</p>
//        </div>

//        <div className='flex justify-around items-center'>
         
//         <p className="text-xs text-slate-500 mt-2">
//            {project.createdAt}
//        </p>
//        <div className="flex justify-end gap-2 mt-2">
//         {location.pathname === "/community"
//         ? (<div>
//              <p className='px-3 py-1 bg-gray-600 text-white rounded-md text-sm'>Site-Builder </p>  {/*add creator name */}
//         </div>)
//         : (
//             <>
//                 <button className="px-3 py-1 bg-slate-700 rounded-md text-sm hover:bg-slate-600 transition">
//                 Preview
//                 </button>

//                 <button className="px-3 py-1 bg-slate-700 rounded-md text-sm hover:bg-slate-600 transition">
//                 Open
//                 </button>
//             </>
//             )
//         }
        
//         </div>

//         </div>
//         {
//          location.pathname === "/community" ? ("") :
//          (
//                   <div onClick={(e)=> e.stopPropagation()} >
//              <TrashIcon className='absolute top-3  right-3  scale-0  group-hover:scale-100 bg-white p-1.5 size-7 rounder text-red-500 text-xl cursor-pointer
//           transition-all 'onClick={()=>deleteProject(project.id)}/>
//         </div>
//          ) 
//         }

          

//        </div>

    
//   )
// }

// export default ProjectCard
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {

  return (
    <div  className="
  relative group w-72 max-sm:mx-auto cursor-pointer
  flex flex-col max-w-[300px]
  rounded-xl overflow-hidden pb-3

  bg-white/5 backdrop-blur-xl
  border border-white/10
  hover:bg-

  shadow-lg shadow-black/40

  transition-all duration-300
  
  hover:shadow-indigo-500/20
  hover:-translate-y-2 hover:scale-[1.02]
  hover:border-indigo-800/80
  hover:bg-indigo-100/10


">  
{/* check css */}
    {/* look above css properties */}
      {/* PREVIEW SECTION */}
      <div className="relative w-full h-40 overflow-hidden bg-black
      border-b border-white/10 ">
         
        {project.current_code? <iframe
          title={project.name}
          srcDoc={project.current_code}
          className="
            absolute top-1 left-1
            w-300 h-200 
            transition-transform duration-500
            origin-top-left pointer-events-none
          " sandbox="allow-scripts allow-same-origin"
             style={{transform :'scale(0.25)'}}

        />
        //see above css properties
         : <div className="flex items-center justify-center
        h-full text-gray-500">
           <p>No Preview</p>
        </div>}

        

      </div>

      {/* CONTENT SECTION */}
       <div className="flex flex-col gap-2 p-4 bg-gradient-to-b from-transparent to-black/40">
          {/* TITLE + TAG */}
        <div className="flex justify-between items-start mb-2 gap-4">

           <p className="text-lg font-semibold leading-snug line-clamp-1 text-white/90">{project.name}</p>
          <span  className="text-xs bg-indigo-600 text-indigo-100 px-2 py-0.5 rounded-full">
            Website
          </span>

        </div>
         <p className=" text-sm leading-snug line-clamp-2 text-gray-400 ">{project.initial_prompt}</p>
       </div>

 


        {/* FOOTER */}
        <div className="mt-auto flex items-center justify-around pt-4">

          <span className="text-xs text-gray-500">
            {new Date(project.createdAt).toLocaleDateString()}
          </span>

          <div className="flex gap-2">

            {/* PREVIEW BUTTON */}
            <Link
              to={`/preview/${project.id}`}
              className="px-3 py-1.5 bg-indigo-600   text-white rounded-md text-sm hover:bg-indigo-900 transition"
            >
              Preview
            </Link>

            {/* OPEN BUTTON */}
            <Link
              to={`/projects/${project.id}`}
              className="px-3 py-1.5 bg-white/10 rounded-md text-sm hover:bg-white/20 transition text-shadow-black"
            >
              Open
            </Link>

          </div>

        </div>
        <div onClick={(e)=> e.stopPropagation()} >
            <TrashIcon className='absolute top-3  right-3  scale-0  group-hover:scale-100 bg-white p-1.5 size-7 rounder text-red-500 text-xl cursor-pointer
          transition-all 'onClick={()=>deleteProject(project.id)}/>
        </div>

      </div>

    
  );
};

export default ProjectCard;