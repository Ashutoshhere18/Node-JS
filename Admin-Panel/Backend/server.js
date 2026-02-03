import express from 'express'
import router from './routes/auth-routes.js'
import adminRoute from './routes/admin-routes.js'
import dotenv from 'dotenv'
import {connectDB} from './config/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config();
const app=express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
connectDB();

app.use("/api/auth",router);
app.use("/api/admin",adminRoute);




app.listen(process.env.PORT,()=>{
    console.log("Server Started Successfully!");
})