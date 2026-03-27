import { EyeIcon, Link } from "lucide-react";

function VersionCard({ ver, project }) {

  const isCurrent =
    project.current_version_index === ver.id;
    const handleRollBack=(versionId)=>{


    }

  return (
    <div key={ver.id} className="w-4/5 mx-auto my-2 p-3 rounded-xl border flex flex-col gap-2 bg-gray-800 text-gray-100 shadow">

      {/* TITLE */}
      <div className="text-xs font-medium">
        code updated
        <span className="ml-2 text-gray-500 font-normal text-xs ">
          {new Date(ver.timestamp).toLocaleString()}
        </span>
      </div>

      {/* ACTION ROW */}
      <div className="flex items-center justify-between">

        {isCurrent ? (
          <button className="text-xs bg-gray-700 px-3 py-1 rounded-md ">
            Current version
          </button>
        ) : (
          <button onClick={()=>handleRollBack(ver.id)} className="text-xs bg-indigo-500 hover:bg-indigo-700 text-white px-3  py-1 rounded-md">
            Rollback to this version
          </button>
        )}

        {/* PREVIEW LINK */}
        <Link target="_blank" to={`/preview/${project.id}/${ver.id}`}>
          <EyeIcon className="size-6 p-1 bg-gray-700 hover:bg-indigo-500 transition-colors rounded"/>
        </Link>

      </div>
    </div>
  );
}
export default VersionCard