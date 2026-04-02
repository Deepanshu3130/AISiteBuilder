//controller for revision of the code 
import openai from "../config/openAi.js"
import prisma from "../lib/prisma.js"

export const makeRevision = async(req , res)=>{
    const userId = req.userId
    try{
        const {projectId} = req.params
        const {message} = req.body

        const user = await prisma.user.findUnique({
            where : {id:userId}
        })
        if(!userId || !user){
            return res.status(401).json({message:"Unauthorize"});

        }

        if(user.credits <2){
             return res.status(403).json({message:"add more cerdits to make changes"});
        }

        if(!message || message.trim() === ''){
               return res.status(400).json({message:"Please enter a valid prompt"});
        }
        const currentProject = await prisma.websiteProject.findUnique({
            where : {id:projectId , userId},
            include: {versions: true}
        });
        if(!currentProject){
            return res.status(404).json({message:"project not found"});
        }

        await prisma.conversation.create({
            data:{
                role : 'user',
                content : message,
                projectId
            }
        })

        await prisma.user.update({
            where: {id:userId},
            data:{credits : {decrement:5}}
        })

        // ehanced prompt
        const promptEnhanceResponse = await openai.chat.completions.create({
            model:'stepfun/step-3.5-flash:free',
            messages :[
                {
                    role:'system',
                    content:`
                You are a prompt enhancement specialist. The user wants to make changes to their website. Enhance their request to be more specific and actionable for a web developer.

                    Enhance this by:
                    1. Being specific about what elements to change
                    2. Mentioning design details (colors, spacing, sizes)
                    3. Clarifying the desired outcome
                    4. Using clear technical terms

                Return ONLY the enhanced request, nothing else. Keep it concise (1-2 sentences).`
                },
                {
                    role:'user',
                    content:`User's request : "${message}"`
                }
            ]
        })
        const enhancedPrompt = promptEnhanceResponse.choices[0].message.content;

        await prisma.conversation.create({
            data :{
                role:'assistant',
                content :`I've enhanced your prompt to : "${enhancedPrompt}"`,
                projectId
            }
        })
            await prisma.conversation.create({
            data :{
                role:'assistant',
                content :`now making changes to your website...`,
                projectId
            }
        })
        //generate the website code

        const codeGenerationResponse = await openai.chat.completions.create({
                model :'nvidia/nemotron-3-super-120b-a12b:free',
                messages :[
                    {
                        role: "system",
                        content: `You are an expert web developer. 

                        CRITICAL REQUIREMENTS:
                        - Return ONLY the complete updated HTML code with the requested changes.
                        - Use Tailwind CSS for ALL styling (NO custom CSS).
                        - Use Tailwind utility classes for all styling changes.
                        - Include all JavaScript in <script> tags before closing </body>
                        - Make sure it's a complete, standalone HTML document with Tailwind CSS
                        - Return the HTML Code Only, nothing else

                        Apply the requested changes while maintaining the Tailwind CSS styling approach.
                    `
                    },
                    {
                        role: 'user',
                        content : `here is the current website code: "${currentProject.current_code}" the user want to change : "${enhancedPrompt}"`
                    }
                ]
         })
         const code = codeGenerationResponse.choices[0].message.content || ''

         if(!code){
            await prisma.conversation.create({
                data:{
                    role :'assistant',
                    content:"unable to generate the code , please try again",
                    projectId
                }
            })
             await prisma.user.update({
            where: {id:userId},
            data:{credits : {increment:5}}
            })
            return;
         }



         const version = await prisma.version.create({
            data:{
                code : code.replace(/```[a-z]*\n?/gi, '')
                .replace(/```$/g, '')
                .trim(),
                description :'Changes made',
                projectId
                
            }
         })

         await prisma.conversation.create({
            data:{
                role: 'assistant',
                content:"I've made the changes to your website! you can now preview it",
                projectId
            }
         })

         await prisma.websiteProject.update({
            where :{id:projectId},
            data:{
                current_code:code.replace(/```[a-z]*\n?/gi, '')
                .replace(/```$/g, '')
                .trim(),
                 current_version_index : version.id,

            }
         })

  
        res.json({message: `changes made successfully`})
    }catch(error){

            await prisma.user.update({
            where: {id:userId},
            data:{credits : {increment:5}}
        })
        console.log(error.code || error.message);
        res.status(500).json({
            message:error.message
        })
    }
}

export const rollbackToVersion = async (req, res) => {
  try {
    const userId = req.userId;

    // Check authentication
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { projectId, versionId } = req.params;

    // 📦 Get project with versions
    const project = await prisma.websiteProject.findFirst({
      where: {
        id: projectId,
        userId: userId,
      },
      include: {
        versions: true,
      },
    });

    //  Project not found
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // 🔍 Find the specific version
    const version = project.versions.find(
      (v) => v.id === versionId
    );

    //  Version not found
    if (!version) {
      return res.status(404).json({ message: "Version not found" });
    }

    //  Update project with selected version
    await prisma.websiteProject.update({
      where: {
        id: projectId,
      },
      data: {
        current_code: version.code,
        current_version_index: version.id,
      },
    });

    //  Create system message (optional feature)
    await prisma.conversation.create({
      data: {
        role: "assistant",
        content:
          "I've rolled back your website to selected version. You can now preview it",
        projectId: projectId,
      },
    });

    // success response
    return res.json({ message: "Version rolled back" });

  } catch (error) {
    console.log(error.code || error.message);
    return res.status(500).json({ message: error.message });
  }
};

// delete project
export const deleteProject = async (req, res) => {
  try {
    const userId = req.userId;
    const { projectId } = req.params;

    // Check authentication
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    //  Check if project exists & belongs to user
    const project = await prisma.websiteProject.findFirst({
      where: {
        id: projectId,
        userId: userId,
      },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    //  Delete project
    await prisma.websiteProject.delete({
      where: {
        id: projectId,
      },
    });

    //  Success response
    return res.json({ message: "Project deleted successfully" });

  } catch (error) {
    console.log(error.code || error.message);
    return res.status(500).json({ message: error.message });
  }
};


export const getProjectPreview = async (req, res) => {
    console.log("in the project preview controller")
    
  try {
    const userId = req.userId;
    const { projectId } = req.params;

    //  Check authentication
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    //  Fetch project with versions
    const project = await prisma.websiteProject.findFirst({
      where: {
        id: projectId,
        userId: userId,
      },
      include: {
        versions: true,
      },
    });

    // Project not found
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // ✅ Send project data
    return res.json({ project });

  } catch (error) {
    console.log(error.code || error.message);
    return res.status(500).json({ message: error.message });
  }
};



export const getPublishedProjects = async (req, res) => {
  try {
    //  Fetch all published projects
    const projects = await prisma.websiteProject.findMany({
      where: {
        isPublished: true,
      },
      include: {
        user: true, //  includes user info (author)
      },
    });

    // Send response
    return res.json({ projects });

  } catch (error) {
    console.log(error.code || error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;

    // 📦 Fetch project
    const project = await prisma.websiteProject.findFirst({
      where: {
        id: projectId,
      },
    });

    // ❌ Validate project
    if (
      !project ||
      project.isPublished === false ||
      !project.current_code
    ) {
      return res.status(404).json({ message: "Project not found" });
    }

    // ✅ Send project code
    return res.json({
      code: project.current_code,
    });

  } catch (error) {
    console.log(error.code || error.message);
    return res.status(500).json({ message: error.message });
  }
};


export const saveProjectCode = async (req, res) => {
  try {
    const userId = req.userId;
    const { projectId } = req.params;
    const { code } = req.body;

    //  Check authentication
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    //  Validate code
    if (!code) {
      return res.status(400).json({ message: "Code is required" });
    }

    // 🔍 Check project ownership
    const project = await prisma.websiteProject.findFirst({
      where: {
        id: projectId,
        userId: userId,
      },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    //  Update project code
    await prisma.websiteProject.update({
      where: {
        id: projectId,
      },
      data: {
        current_code: code,
        current_version_index: '', // reset version tracking
      },
    });

    //  Success response
    return res.json({ message: "Project saved successfully" });

  } catch (error) {
    console.log(error.code || error.message);
    return res.status(500).json({ message: error.message });
  }
};