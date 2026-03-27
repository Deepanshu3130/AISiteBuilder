import express from "express";
import 'dotenv/config';
import cors from 'cors';
import {toNodeHandler} from 'better-auth/node'
import { auth } from "./lib/auth.js";

const port =3000;

const app = express();
const corsOptions ={
    origin: process.env.TRUSTED_ORIGINS?.split(',')||[],
    credentials: true,
}  // see this cors thing too


app.use(cors(corsOptions));
app.all('/api/auth/{*any}', toNodeHandler(auth));




app.get('/' , (req , res) =>(
    res.send('server is live')
))
 app.listen(port , ()=>{
    console.log(`server is running at http://localhost:${port}`)
 })
