import { Link } from "react-router-dom";
 import { TrashIcon } from 'lucide-react';


const CommunityCard = ({ project }) => {

  return (
    <Link
      to={`/view/${project.id}`}
      target="_blank"

      className="
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


      "
      >
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
            <div className="px-3 py-1.5 bg-indigo-600 rounded-full text-sm hover:bg-white/20 transition text-shadow-black" >
             { project.user}
            </div>

            {/* OPEN BUTTON */}


          </div>

        </div>

    </Link>
  );
};

export default CommunityCard;