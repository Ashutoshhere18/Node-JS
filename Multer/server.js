import express from 'express'
import multer from 'multer'
import {fileURLToPath} from 'url'
import path from 'path'
import mongoose from 'mongoose'


const app=express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Animals")
.then( ()=>console.log("MongoDB Connected!.."))
.catch((err)=>console.log(err));


const _filename=fileURLToPath(import.meta.url);
const _dirname=path.dirname(_filename);
const uploadPath=path.join(_dirname,"uploads");


const animalSchema=new mongoose.Schema({
    name:String,
    category:String,
    img_path:String
},{timestamp:true});

const animals=mongoose.model("animals",animalSchema);

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploadPath);
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+ path.extname(file.originalname))
    }
})

const upload=multer({storage})

app.post("/",upload.single("image"),async(req,res)=>{
    const animal=new animals({
        name:"Tommy",
        category:"Dog",
        img_path:req.file.filename
    });
    const result=await animal.save();
    res.json({msg:"Animal Added",result});
})

app.listen(4000,()=>{
    console.log("Server started at 4000...")
})