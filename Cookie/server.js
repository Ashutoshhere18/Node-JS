import express from 'express'
import router from './router/User.router.js'
import cookieParser from 'cookie-parser'
import {connectDB} from './config/db.js'
import {fileURLToPath} from 'url'
import path from 'path'
const app=express();

const _filename=fileURLToPath(import.meta.url);
const _dirname=path.dirname(_filename);
export const homePath=path.join(_dirname,"static","index.html");
export const signInPath=path.join(_dirname,"static","signin.html");
export const signUpPath=path.join(_dirname,"static","signup.html");

app.use(express.json());
app.use(cookieParser());

app.use("/",router);
connectDB();
app.listen(4000,()=>{
    console.log("Server Started !..");
})