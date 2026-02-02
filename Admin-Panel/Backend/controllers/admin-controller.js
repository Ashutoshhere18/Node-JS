
import {userCollection} from '../models/user-model.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export const updateUser=async(req,res)=>{
  const {email}=req.body;
  try{
  await userCollection.updateOne({email},{$set:req.body});
  return res.json({status:true,message:"User Updated Successfully!"});
  }catch(err){
return res.json({status:false,message:err.message});
  }
}

export const getAllUsers=async(req,res)=>{
    const {email}=req.body;
  try{
  const users=await userCollection.find();
  return res.json({status:true,message:"All User Fetched!"}); 
  }catch(err){
return res.json({status:false,message:err.message}); 
  }

}

export const getCurrentUser=async(req,res)=>{

try{
 const token=req.cookies.auth_token
const decoded=jwt.verify(token,process.env.SECRET_KEY);
return res.json({status:true,message:"User Fetched Succesfully!",user:decoded._doc});
}catch(err){
return res.json({status:false,message:err.message});
}

}