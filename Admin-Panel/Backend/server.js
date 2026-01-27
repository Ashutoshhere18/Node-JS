import express from 'express'
import router from './routes/auth-routes.js'
import dotenv from 'dotenv'
import {connectDB} from './config/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config();
const app=express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
connectDB();

app.use("/api/auth",router);

app.use(cookieParser());


app.listen(process.env.PORT,()=>{
    console.log("Server Started Successfully!");
})