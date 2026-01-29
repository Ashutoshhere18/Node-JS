
import {userCollection} from '../models/user-model.js'

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
  const users=await userCollection.find({email});
  return res.json({status:true,message:"All User Fetched!"}); 
  }catch(err){
return res.json({status:false,message:err.message}); 
  }

}