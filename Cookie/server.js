import express from 'express'
import router from './router/User.router.js'
import cookieParser from 'cookie-parser'
import {connectDB} from './config/db.js'
const app=express();

app.use(express.json());
app.use(cookieParser());

app.use("/",router);
connectDB();
app.listen(4000,()=>{
    console.log("Server Started !..");
})