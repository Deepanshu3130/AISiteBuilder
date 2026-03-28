import express from "express";
import 'dotenv/config';
import cors from 'cors';
import {toNodeHandler} from 'better-auth/node'
import { auth } from "./lib/auth.js";
import userRouter from "./routes/userRoutes.js";
import projectRouter from "./routes/projectsRoutes.js";

const port =3000;

const app = express();
const corsOptions ={
    origin: process.env.TRUSTED_ORIGINS?.split(',')||[],
    credentials: true,
}  // see this cors thing too


app.use(cors(corsOptions));
app.all('/api/auth/{*any}', toNodeHandler(auth));
app.use(express.json({limit: '50mb'}))




app.get('/' , (req , res) =>(
    res.send('server is live')
));

app.use('/api/user' , userRouter)
app.use('/api/project' , projectRouter)

 app.listen(port , ()=>{
    console.log(`server is running at http://localhost:${port}`)
 })
