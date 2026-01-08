import express from 'express'
import {connectDB} from './config/db.js'
import router from './routes/Otp_route.js'

const app=express();
app.use(express.json());

connectDB();

app.use("/",router);

app.listen(4000,()=>{
    console.log("Server Started Successfully!");
})