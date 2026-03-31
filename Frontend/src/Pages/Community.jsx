import React, { useEffect, useState } from 'react'
import ProjectCard from '../components/ProjectCard';
import CommunityCard from '../components/CommunityCard';
import { useNavigate } from 'react-router-dom';
import api from '../configs/axios';
import { toast } from 'sonner';

const Community = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/api/project/published');
      setProjects(data?.projects || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  if (projects.length === 0) {
    return <div className="text-white text-center mt-20">No projects found</div>;
  }

  return (
    <div className="mt-8 max-w-[80%] mx-auto">
      <div className="flex justify-between text-white">
        <p className="text-2xl font-bold">Published Projects</p>
      </div>

      <div className="flex mt-10 flex-wrap gap-4">
        {projects.map((project) => (
          <CommunityCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};
export default Community