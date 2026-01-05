
import {userModel} from '../models/UserModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const signUp=async(req,res)=>{
  try{
  const{email,password}=req.body;
  const hashedPassword= await bcrypt.hash(password,10);
  const result=await userModel.create({email,password:hashedPassword});
  res.json({message:"SignUp successfull!...",result});
  }catch(err){
res.json({msg:"SignUP not done!..",err});
  }

}

export const signIn=async(req,res)=>{
    const{email,password}=req.body;
   const User=await userModel.findOne({email});

   if(!User){
    res.json({message:"user not exist "});
   }

   const isMatch=await bcrypt.compare(password,userModel.password);
   if(!isMatch){
    res.json({message:"Incorrect Password!.. "});
   }

   const token=jwt.sign({userId:User._id},"#$%^&**&^%$#",{expiresIn:"1h"});
   res.json({msg:"signIn successfull!..",token});
}

export const home=async(req,res)=>{
    res.json({msg:"home Page", user:req.user,token:req.token});
}