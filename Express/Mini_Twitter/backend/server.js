import express from 'express'
import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'
import cors from 'cors'

const app=express();
app.use(cors());
app.use(express.json());

const _filename=fileURLToPath(import.meta.url);
const _dirname=path.dirname(_filename);
const filePath=path.join(_dirname,"db.json");


const ReadFile=()=>{
    const twit=fs.readFileSync(filePath,"utf-8");
    return JSON.parse(twit);
};

const WriteFile=(twits)=>{
fs.writeFileSync(filePath,JSON.stringify(twits));
}
app.get("/",(req,res)=>{
  const twits=ReadFile();
  res.json(twits);
});

app.post("/",(req,res)=>{
    let twits=ReadFile();
    twits.push(req.body);
    WriteFile(twits);
    res.json({msg:"Twit Inserted Successfully!...."},twits);

});

app.put("/",(req,res)=>{
    const body=req.body;
    let twits=ReadFile();
    twits=twits.map((twit)=>{
        if(twit.id==body.id){
          return body;
        }
        return twit;
    });
    WriteFile(twits);
    res.json({msg:"Twits Updated Successfully"},twits);
});

app.delete("/:id",(req,res)=>{
    let twits=ReadFile();
  const id=req.params.id;
  twits=twits.filter((twit)=>twit.id!=id);
  WriteFile(twits);
  res.json({msg:"Twits Deleted Succesfully!.."},twits);
});

app.listen(4000,()=>{
    console.log("Server Started at 4000 Port.....!");
});