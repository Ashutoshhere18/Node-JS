import express from 'express'
import cookieParser from 'cookie-parser'

const app=express();
app.use(express.json());
app.use(cookieParser());

const users={
    email:"admin@gmail.com",
    password:"admin@123"
}

const isAuthenticated=(req,res,next)=>{
  if(req.cookies.auth){
    next();
  }
  else{
    res.json({message:"Login is Mandatory!.."});
  }
}

app.post("/signin",(req,res)=>{
  
    const {email,password}=req.body;

     if(email==users.email && password==users.password){
  res.cookie("auth",true,{
    maxAge:1000*60*60,
    httpOnly:true,
    sameSite:"strict"
  })
  res.json({message:"Login in successfull!.."});
     }
    
  res.status(400).json({message:"Enter Valid credential!"});
   
})

app.get("/home",isAuthenticated,(req,res)=>{

    res.json({message:"Home Page"});
})

app.listen(4000,()=>{
    console.log("Server Started !..");
})