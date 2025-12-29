import BookRouter from "./routes/router.js"
import {logger} from './middleware/logger.js'
import express from 'express'
import connectDB from './config/db.js'

const app=express();
app.use(express.json());
app.use(logger);

connectDB();

app.use("/api",BookRouter)

app.listen(4000,()=>{
    console.log("Server Started successfully!..");
});