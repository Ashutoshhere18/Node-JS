import userModel from '../Model/User.model.js'
import mongoose from 'mongoose'

import {homePath,signInPath,signUpPath} from '../server.js'

export const signUp=async(req,res)=>{

    const result=await userModel.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password

    })
    res.json({message:"SignUp successfull!",result});
};

export const signIn=async(req,res)=>{
    const {email,password}=req.body;
    
    const result=await userModel.findOne({email,password});

    if(!result){
      return res.json({message:"Invalid Credential"})
    }
     res.cookie("auth", true, {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    sameSite: "strict"
  });

  res.json({ message: "Signin successful!" });
};

export const home=async(req,res)=>{
  // const users=await userModel.find();
  // res.json(users);

  res.sendFile(homePath);
}

export const signInHtml=async(req,res)=>{
  res.sendFile(signInPath);
}

export const signUpHtml=async(req,res)=>{
  res.sendFile(signUpPath);
}