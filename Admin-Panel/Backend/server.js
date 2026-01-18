import express from 'express'
import router from './routes/auth-routes.js'
import dotenv from 'dotenv'
import {connectDB} from './config/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config();
const app=express();

connectDB();

app.use("/api/auth",router);
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(process.env.PORT,()=>{
    console.log("Server Started Successfully!");
})