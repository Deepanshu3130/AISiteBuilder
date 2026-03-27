import React, {
  forwardRef,
  useRef,
  useImperativeHandle
} from "react";
import PreviewLoader from "./PreviewLoader";

const resolutions = {
  phone: "max-w-[375px]",
  tablet: "max-w-[768px]",
  laptop: "max-w-full"
};

const ProjectPreview = forwardRef(
  (
    {
      project,
      isGenerating,
      device = "laptop",
      showEditorPanel = true
    },
    ref
  ) => {
    const iframeRef = useRef(null);

    // Script that gets injected into iframe
        const iframeScript = `
        <style>
        ::-webkit-scrollbar {
            display: none;
        }

        body {
            scrollbar-width: none;
            -ms-overflow-style: none;
        }
        </style>
`;
    // Inject script into HTML safely
    const injectPreview = (html) => {
      if (!html) return "";

      if (!showEditorPanel) return html;

      if (html.includes("</body>")) {
        return html.replace(
          "</body>",
          iframeScript + "</body>"
        );
      }

      return html + iframeScript;
    };

    // Expose methods to parent
    // useImperativeHandle(ref, () => ({
    //   reloadPreview() {
    //     if (iframeRef.current) {
    //       iframeRef.current.contentWindow.location.reload();
    //     }
    //   }
    // }));

    return (
      <div className="relative w-full h-full bg-gray-900 rounded-xl flex-1 overflow-hidden">

        {/* If code exists, show iframe */}
        {project?.current_code ? (
          <iframe
            ref={iframeRef}
            title="Project Preview"
            srcDoc={injectPreview(project.current_code)}
            className={`h-full w-full ${resolutions[device]} mx-auto border-none`}
          />
        ) : isGenerating ? (
          // Loading state
          <div className="flex items-center justify-center h-full text-white">
            <PreviewLoader/>
          </div>
        ) : (
          // No code fallback
          <div className="flex items-center justify-center h-full text-gray-400">
            No Preview Available
          </div>
        )}

      </div>
    );
  }
);

export default ProjectPreview;