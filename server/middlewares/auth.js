import { fromNodeHeaders } from "better-auth/node"
import { auth } from "../lib/auth"



export const protect = async(req , res , next )=>{
    try{
        const session = await auth.api.getSession({
            headers : fromNodeHeaders(req.headers) // see this part
        })

        if(!session || !session?.user){
            return res.status(401).json({message: 'unauthorized user'})
        } // this and revice this too 
        req.userId = session.user.id
        next()
    }catch(error){
      console.log(error);
      res.status(401).json({message:error.code || error.message})
    }

} 