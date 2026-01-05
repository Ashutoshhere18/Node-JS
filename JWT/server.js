import express from 'express'
import {connectDB} from './config/db.js'
import router from './routes/UserRoute.js'

const app=express();
app.use(express.json());
connectDB();
app.use("/api",router);

const PORT=4040;

app.listen(PORT,()=>{
    console.log("Server Started at 4040!..");
})