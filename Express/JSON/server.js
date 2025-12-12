import express from 'express'
import fs from 'fs'
import {fileURLToPath} from 'url'
import path from 'path'

const app=express();
app.use(express.json());

const _filename=fileURLToPath(import.meta.url);
const _dirname=path.dirname(_filename);

const filePath=path.join(_dirname,'db.json');


const readData=()=>{
const data=fs.readFileSync(filePath,"utf-8");
return JSON.parse(data);
};
const writeUsers=(users)=>{
      fs.writeFileSync(filePath,JSON.stringify(users));
};


app.get('/',(req,res)=>{
 
 const users=readData() ;
 res.json(users);
});

app.post('/',(req,res)=>{
    let users=readData();
    users.push(req.body);
    writeUsers(users);
    res.json({message:"User added successfully"},users);
});

app.delete('/:id',(req,res)=>{
    let users=readData();
   const  Id=req.params.id;
    users =users.filter((user)=>user.id!=Id);
    writeUsers(users);
    res.json({message:"User deleted successfully"},users);

});

app.put("/",(req,res)=>{
    let users=readData();
    const updatedUser=req.body;
    users=users.map((user)=>{
        if(user.id==updatedUser.id){
            return updatedUser;
        };
        return user;
    });
    writeUsers(users);
    res.json({message:"User updated successfully"},users);
})

app.listen(3000,()=>{
    console.log('Server Started at port 3000');
})