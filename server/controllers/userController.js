import { use } from "react"
import prisma from "../lib/prisma.js"
import openai from "../config/openAi.js"





// get user Credits
export const getUserCredits = async(req , res)=>{
    try{
        const userId = req.userId
        if(!userId){
            return res.status(401).json({
                message:"Unautherized"
            })
        }
        const user = await prisma.user.findUnique({
            where : {id:userId}
        })
        res.json({credits:user?.credits})
    }catch(error){
        console.log(error.code || error.message);
        res.status(500).json({
            message:error.message
        })
    }
}


//create New project
// export const createUserProject = async(req , res)=>{
//     const userId = req.userId
//     try{
//         const {initial_prompt} = req.body
//         if(!userId){
//             return res.status(401).json({
//                 message:"Unautherized"
//             })
//         }
//         const user = await prisma.user.findUnique({
//             where : {id:userId}
//         })

//         if(user&& user.credits < 5){
//             return  res.status(403).json({
//                 message :"add credits to create more projects"
//             })
//         }
//         //create new project
//         const project = await prisma.websiteProject.create({
//             data :{
//                 name : initial_prompt.length > 50 ? initial_prompt.substring(0 , 47)+'...': initial_prompt,
//                 initial_prompt,
//                 userId
//             }
//         })
//         //upadte user total creation
//         await prisma.user.update({
//             where :{id:userId},
//             data :{totalCreation:{increment:1}}
//         })

//         await prisma.conversation.create({
//             data:{
//                 role:'user',
//                 content:initial_prompt,
//                 projectId : project.id
//             }
//         })
//         await prisma.user.update({
//             where :{id:userId},
//             data : {credits :{decrement :5}}
//         })


//         res.json({projectId : project.id});

//         //ehance user promt
//         const promtEnhanceRes = await openai.chat.completions.create(
//             {
//                 model :'deepseek/deepseek-chat',
//                 messages :[
//                     {
//                         role: "system",
//                         content: `You are a prompt enhancement specialist. Take the user's website request and expand it into a detailed, comprehensive prompt that will help create the best possible website.

//                             Enhance this prompt by:
//                             1. Adding specific design details (layout, color scheme, typography)
//                             2. Specifying key sections and features
//                             3. Describing the user experience and interactions
//                             4. Including modern web design best practices
//                             5. Mentioning responsive design requirements
//                             6. Adding any missing but important elements

//                         Return ONLY the enhanced prompt, nothing else. Make it detailed but concise (2-3 paragraphs max).
// `
//                     },
//                     {
//                         role: 'user',
//                         content : initial_prompt
//                     }
//                 ]
//             }
//         ) 
//          const enhancedPrompt = promtEnhanceRes.choices[0].message.content;

//          await prisma.conversation.create({
//             data :{
//                 role:'assistant',
//                 content:`I've enhanced your prompt to: "${enhancedPrompt}" `,
//                 projectId:project.id
//             }
//          })

//             await prisma.conversation.create({
//             data :{
//                 role:'assistant',
//                 content:'now generating your website',
//                 projectId:project.id
//             }
//          })

//          // generating the code for the given promt
//          const codeGenerationResponse = await openai.chat.completions.create({
//                 model :'deepseek/deepseek-chat',
//                 messages :[
//                     {
//                         role: "system",
//                         content: `You are an expert web developer. Create a complete, production-ready, single-page website based on this request: "${enhancedPrompt}"

//                                     CRITICAL REQUIREMENTS:
//                                     - You MUST output valid HTML ONLY. 
//                                     - Use Tailwind CSS for ALL styling
//                                     - Include this EXACT script in the <head>: <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
//                                     - Use Tailwind utility classes extensively for styling, animations, and responsiveness
//                                     - Make it fully functional and interactive with JavaScript in <script> tag before closing </body>
//                                     - Use modern, beautiful design with great UX using Tailwind classes
//                                     - Make it responsive using Tailwind responsive classes (sm:, md:, lg:, xl:)
//                                     - Use Tailwind animations and transitions (animate-*, transition-*)
//                                     - Include all necessary meta tags
//                                     - Use Google Fonts CDN if needed for custom fonts
//                                     - Use placeholder images from https://placehold.co/600x400
//                                     - Use Tailwind gradient classes for beautiful backgrounds
//                                     - Make sure all buttons, cards, and components use Tailwind styling

//                                     CRITICAL HARD RULES:
//                                     1. You MUST put ALL output ONLY into message.content.
//                                     2. You MUST NOT place anything in "reasoning", "analysis", "reasoning_details", or any hidden fields.
//                                     3. You MUST NOT include internal thoughts, explanations, analysis, comments, or markdown.
//                                     4. Do NOT include markdown, explanations, notes, or code fences.

//                                     The HTML should be complete and ready to render as-is with Tailwind CSS.`
//                     },
//                     {
//                         role: 'user',
//                         content : enhancedPrompt || " "
//                     }
//                 ]
//          })

//          const code = codeGenerationResponse.choices[0].message.content || '';

         
//                   if(!code){
//                      await prisma.conversation.create({
//                          data:{
//                              role :'assistant',
//                              content:"unable to generate the code , please try again",
//                              projectId: project.id
//                          }
//                      })
//                       await prisma.user.update({
//                      where: {id:userId},
//                      data:{credits : {increment:5}}
//                      })
//                      return;
//                   }
         

//          // create the version for the projects
//          const version = await prisma.version.create({
//             data :{
//                 code : code.replace(/```[a-z]*\n?/gi, '')
//                 .replace(/```$/g, '')
//                 .trim(),
//                 description :'Initial Version',
//                 projectId : project.id
            
//             }
//          })

//          await prisma.conversation.create({
//             data:{
//                 role:'assistant',
//                 content:"I've created your website! you can now preview it and request any chnages",
//                 projectId : project.id
//             }
//          })

//          await prisma.websiteProject.update({
//             where : {id: project.id},
//             data:{
//                 current_code:code.replace(/```[a-z]*\n?/gi, '')
//                 .replace(/```$/g, '')
//                 .trim(),
//                 current_version_index : version.id
//             }
//          })

//         //  return res.json({projectId : project.id});

//     }catch(error){
//         await prisma.user.update({
//             where :{id:userId},
//             data : {
//                 credits : {increment:5}
//             }
//         })
//         console.log(error.code || error.message);
//         res.status(500).json({
//             message:error.message
//         })
//     }
// }



const generateWebsite = async (projectId, initial_prompt, userId ) => {
  try {
    console.log(" Generation started for:", projectId);

    // 1. Enhance prompt
    const promptEnhanceRes = await openai.chat.completions.create({
      model: "stepfun/step-3.5-flash:free",
      messages: [
        {
          role: "system",
          content: `You are a prompt enhancement specialist. Take the user's website request and expand it into a detailed, comprehensive prompt that will help create the best possible website.

                           Enhance this prompt by:
                             1. Adding specific design details (layout, color scheme, typography)
                             2. Specifying key sections and features
                             3. Describing the user experience and interactions
                             4. Including modern web design best practices
                             5. Mentioning responsive design requirements
                             6. Adding any missing but important elements

                         Return ONLY the enhanced prompt, nothing else. Make it detailed but concise (2-3 paragraphs max).
 `,
        },
        {
          role: "user",
          content: initial_prompt,
        },
      ],
    });

    const enhancedPrompt =
      promptEnhanceRes.choices[0]?.message?.content || initial_prompt;

    await prisma.conversation.create({
      data: {
        role: "assistant",
        content: `I've enhanced your prompt to: "${enhancedPrompt}" `,
        projectId,
      },
    });

    await prisma.conversation.create({
      data: {
        role: "assistant",
        content: "now generating your website...",
        projectId,
      },
    });

    // 2. Generate code
    const codeRes = await openai.chat.completions.create({
      model: "nvidia/nemotron-3-super-120b-a12b:free",
      messages: [
        {
          role: "system",
          content: `You are an expert web developer. Create a complete, production-ready, single-page website based on this request: "${enhancedPrompt}"

                                    CRITICAL REQUIREMENTS:
                                     - You MUST output valid HTML ONLY. 
                                     - Use Tailwind CSS for ALL styling
                                    - Include this EXACT script in the <head>: <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
                                    - Use Tailwind utility classes extensively for styling, animations, and responsiveness
                                    - Make it fully functional and interactive with JavaScript in <script> tag before closing </body>
                                     - Use modern, beautiful design with great UX using Tailwind classes
                                    - Make it responsive using Tailwind responsive classes (sm:, md:, lg:, xl:)
                                     - Use Tailwind animations and transitions (animate-*, transition-*)
                                     - Include all necessary meta tags
                                    - Use Google Fonts CDN if needed for custom fonts
                                    - Use placeholder images from https://placehold.co/600x400
                                    - Use Tailwind gradient classes for beautiful backgrounds
                                    - Make sure all buttons, cards, and components use Tailwind styling

                                     CRITICAL HARD RULES:
                                     1. You MUST put ALL output ONLY into message.content.
                                   2. You MUST NOT place anything in "reasoning", "analysis", "reasoning_details", or any hidden fields.
                                    3. You MUST NOT include internal thoughts, explanations, analysis, comments, or markdown.
                                   4. Do NOT include markdown, explanations, notes, or code fences.

                                   The HTML should be complete and ready to render as-is with Tailwind CSS.`,
        },
        {
          role: "user",
          content: enhancedPrompt,
        },
      ],
    });

    const rawCode = codeRes?.choices?.[0]?.message?.content || "";

                   if(!rawCode){
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

    const cleanCode = rawCode
      .replace(/```[a-z]*\n?/gi, "")
      .replace(/```$/g, "")
      .trim();

    // 3. Save version
    const version = await prisma.version.create({
      data: {
        code: cleanCode,
        description: "Initial Version",
        projectId,
      },
    });

    // 4. Update project
    await prisma.websiteProject.update({
      where: { id: projectId },
      data: {
        current_code: cleanCode,
        current_version_index: version.id,
      },
    });

    await prisma.conversation.create({
      data: {
        role: "assistant",
        content: " Website generated successfully!",
        projectId,
      },
    });

    console.log("Generation completed:", projectId);


  } 
  catch (error) {
    console.log("❌ GENERATION ERROR:", error.response?.data || error.message);

    // Refund credits
    await prisma.user.update({
      where: { id: userId },
      data: { credits: { increment: 5 } },
    });

    await prisma.conversation.create({
      data: {
        role: "assistant",
        content: "❌ Failed to generate website. Please try again.",
        projectId,
      },
    });
    // res. status(500).json({
    //     message:error.message
    //     })  but why??

  }
};

// 🔥 MAIN CONTROLLER
export const createUserProject = async (req, res) => {
  const userId = req.userId;

  try {
    const { initial_prompt } = req.body;

    // ✅ Validation
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!initial_prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.credits < 5) {
      return res
        .status(403)
        .json({ message: "Add credits to create more projects" });
    }

    // 1. Create project
    const project = await prisma.websiteProject.create({
      data: {
        name:
          initial_prompt.length > 50
            ? initial_prompt.substring(0, 47) + "..."
            : initial_prompt,
        initial_prompt,
        userId,
      },
    });

    // 2. Update stats
    await prisma.user.update({
      where: { id: userId },
      data: {
        totalCreation: { increment: 1 },
        credits: { decrement: 5 },
      },
    });

    // 3. Save initial message
    await prisma.conversation.create({
      data: {
        role: "user",
        content: initial_prompt,
        projectId: project.id,
      },
    });

    // ✅ 4. SEND RESPONSE IMMEDIATELY (your idea ✔)
    res.json({ projectId: project.id });

    // 🔥 5. Run background generation (NO await)
    generateWebsite(project.id, initial_prompt, userId);
  } catch (error) {
    console.log("❌ ERROR:", error.response?.data || error.message);

    res.status(500).json({
      message: error.message,
    });
  }
};
//To get the single User Project


export const getUserProjects = async(req , res)=>{
    console.log("in the server ")
    try{
        const userId = req.userId
        if(!userId){
            return res.status(401).json({
                message:"Unautherized"
            })
        }
        const {projectId} = req.params
        console.log("finding....");
        

        const Project = await prisma.websiteProject.findUnique(
            {
                where : {id:projectId , userId},
                include:{
                    conversation:{
                        orderBy:{timestamp:'asc'}
                    },
                    versions:{
                        orderBy:{
                           timestamp: 'asc'
                        }
                    }
                }
            }
        )
        console.log("found...");
        

        return res.json({ Project });
    }catch(error){
        console.log(error.code || error.message);
        res.status(500).json({
            message:error.message
        })
    }
}

// TO get all user Projects



export const getAllUserProjects = async(req , res)=>{
    try{
        const userId = req.userId
        if(!userId){
            return res.status(401).json({
                message:"Unautherized"
            })
        }
       

        const Projects = await prisma.websiteProject.findMany(
            {
                where : {userId},
                orderBy:{updatedAt : 'desc'}  // see all the syntax
            }
        )

        res.json({Projects})
    }catch(error){
        console.log(error.code || error.message);
        res.status(500).json({
            message:error.message
        })
    }
}


// To publish/unpublish the project

export const togglePublish = async(req , res)=>{
    try{
        const userId = req.userId
        if(!userId){
            return res.status(401).json({
                message:"Unautherized"
            })
        }
        const {projectId} = req.params

        const Project = await prisma.websiteProject.findUnique(
            {
                where : {id:projectId,userId},
                
            }
        )
        if(!Project){
            return res(404).json({message:'project not found'})

        }
        await prisma.websiteProject.update({
            where:{id:projectId},
            data: {isPublished: !Project.isPublished}
        })

        res.json({message:Project.isPublished ? 'project Unpublished' : 'Project published Successfully'})
    }catch(error){
        console.log(error.code || error.message);
        res.status(500).json({
            message:error.message
        })
    }

    // for purchasing the credits

    
}
