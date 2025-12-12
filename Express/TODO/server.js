import express from 'express'
import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

const app=express();
app.use(express.json());

const PORT=4000;

const _filename=fileURLToPath(import.meta.url);
const _dirname=path.dirname(_filename);
const filePath=path.join(_dirname,'db.json');

const readFile=()=>{
const todos=fs.readFileSync(filePath,"utf-8");
return JSON.parse(todos);
};

const writeFile=(todos)=>{
    fs.writeFileSync(filePath,JSON.stringify(todos))
}

//GET request
app.get("/",(req,res)=>{
  const todos=readFile();
   
  if (req.query.status === "isCompleted") {
    let filtered = todos.filter(todo => todo.status === "isCompleted");
    return res.json(filtered);
  }

  if (req.query.status === "isNotCompleted") {
    let filtered = todos.filter(todo => todo.status === "isNotCompleted");
    return res.json(filtered);
  }

   if(req.query.title){
    const result=todos.find((todo)=>todo.title===req.query.title)
    res.json(result);
   }


  res.json(todos);
  
});

//POST request
app.post("/",(req,res)=>{
   let todos= readFile();
   todos.push(req.body);
   writeFile(todos);
   res.json({msg:"Todo added successfully!..."},todos);
});

// PUT request
app.put("/",(req,res)=>{
    let todos=readFile();
    const UpdatedTodo=req.body;

   todos= todos.map((todo)=>{
        if(todo.title===UpdatedTodo.title){
          return UpdatedTodo;
        }
        return todo;
    })
     writeFile(todos);
     res.json({msg:"Todo Updated Successfully...."},todos);
});


//Delete request

app.delete("/",(req,res)=>{
    let todos=readFile();
    const query=req.query;
   if(req.query.status==="isCompleted"){
      todos= todos.filter((todo)=>todo.status!=="isCompleted");
   writeFile(todos);
  return res.json({msg:"Todos with isCompleted Status is deleted successfully!.."},todos);
   }
   res.json({msg:"No valid query provided..."})
})


app.listen(PORT,()=>{
    console.log("Server started at port 4000....");
});