import router from './router/Movie.router.js'
import express from 'express'
import {connectDB} from './config/db.js'

const app=express();
app.use(express.json());

app.use("/movie",router);

connectDB();

app.listen(4040,()=>{
    console.log("Server Started at 4040");
})