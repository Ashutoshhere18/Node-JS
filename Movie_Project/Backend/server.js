import router from './router/Movie.router.js'
import express from 'express'
import {connectDB} from './config/db.js'
import path from 'path'
import {fileURLToPath} from 'url'
import cors from 'cors'

const _filename=fileURLToPath(import.meta.url);
export const _dirname=path.dirname(_filename);
export const uploadPath=path.join(_dirname,"uploads");

const app=express();
app.use(express.json());
app.use(cors());

app.use("/",router);
app.use("/uploads",express.static(uploadPath))


connectDB();

app.listen(4040,()=>{
    console.log("Server Started at 4040");
})