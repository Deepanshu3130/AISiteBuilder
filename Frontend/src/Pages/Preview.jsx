import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectPreview from "../components/ProjectPreview";
import { Loader2 } from "lucide-react";
import api from "../configs/axios";
import { toast } from "sonner";
import { authClient } from "../lib/auth-client";

const Preview = () => {


  const { projectId } = useParams();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCode = async() => {

      try{
        const{data} = await api.get(`/api/project/preview/${projectId}`);
        console.log(data)
        setCode(data.project.current_code);
        setLoading(false)
      }catch(e){
        toast.error(e?.response?.data?.message||e.message)
      }

  };

  const {data:session , isPending} = authClient.useSession()

  useEffect(()=>{
   if(!isPending && session?.user){
     fetchCode()
    }
  },[session?.user])

  if(loading){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin size-7 text-indigo-200"/>
      </div>
    );
  }

  return (
    <div className="h-screen">
      {code && (
        <ProjectPreview
          project={{ current_code: code }}
          isGenerating={false}
          showEditorPanel={false}
        />
      )}
    </div>
  );

};

export default Preview;