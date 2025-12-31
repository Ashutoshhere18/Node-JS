import userModel from '../Model/User.model.js'
import mongoose from 'mongoose'
import {homePath,signInPath,signUpPath} from '../server.js'
import bcrypt from 'bcrypt'

export const signUp=async(req,res)=>{

    const result=await userModel.create({
        name:req.body.name,
        email:req.body.email,
        password: await bcrypt.hash(req.body.password,12)

    })
    res.json({message:"SignUp successfull!",result});
};



export const signIn=async(req,res)=>{
try{
  const{email,password}=req.body;
  
  const user=await userModel.findOne({email});

  const isMatch=await bcrypt.compare(password,user.password);

  if(!user){
     return res.json({message:"User Not Found!"})
  }
  if(!isMatch){
     return res.json({message:"Password is incorrect!"});
  }

    res.cookie("auth", true, {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    sameSite: "strict"
  });
  res.json({message:"User SignIn successfully!"})
}catch(err){
   res.json({message:"Sign in Not done!",err:err});
}
}

export const home=async(req,res)=>{
  res.sendFile(homePath);
}

export const signInHtml=async(req,res)=>{
  res.sendFile(signInPath);
}

export const signUpHtml=async(req,res)=>{
  res.sendFile(signUpPath);
}