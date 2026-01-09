import express from 'express'
import router from './routes/Auth_routes.js'
import {connectDB} from './config/db.js'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
const app=express();
app.use(express.json());
app.use(cookieParser());

connectDB();
dotenv.config();
const PORT=process.env.PORT;
app.use("/",router);

app.listen(PORT,()=>{
    console.log("Server Started Successfully!..");
})