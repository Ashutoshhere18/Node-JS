import express from 'express'

const app=express();

app.use(express.json());
let users=[
    {
   "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    },
    {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    },
    {
    "id": 3,
    "name": "Clementine Bauch",
    "username": "Samantha",
    "email": "Nathan@yesenia.net",
    }

];

//GET 
app.get('/api',(req,res)=>{
    res.json(users);
})

//POST

app.post('/api',(req,res)=>{
   users.push(req.body);
   res.json({msg:"User added successfully",users});
});

//PUT

app.put('/api',(req,res)=>{
    const body=req.body;
  users= users.map((user)=>{
    if(user.id==body.id){
       return body;
    }
    return user;
   });
   res.json({msg:"User updated successfully",users});
});

//DELETE 

app.delete('/api/:id',(req,res)=>{
    const id=req.params.id;
    users=users.filter((user)=>user.id!=id);
    res.json({msg:"User deleted successfully",users});
})

app.listen(5000,()=>{
    console.log("Server Started at 5000");
})