
import {authCollection} from '../models/auth-model.js'
import bcrypt from 'bcrypt'
import { sendOtp } from '../services/otp-services.js';
import {otpCollection} from '../models/otp-model.js'
import jwt from 'jsonwebtoken'
import { userCollection } from '../models/user-model.js';

//register user usign signup method
export const signup=async(req,res)=>{
    const {email,password}=req.body;
    try{
    const hashed=await bcrypt.hash(password,12);
    const user=await userCollection.create({email});
    await authCollection.create({email,password:hashed,user:user._id});
    res.json({status:true,message:"user registered successfully !"});
    }catch(err){
        res.json({status:false,message:"user registration failed !"});
    }

}

//for signin
export const signin=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await authCollection.findOne({email});
        if(!user){
            return res.json({status:false,message:"user not found"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({status:false,message:"password is incorrect!"});
        }

        const status=await sendOtp(email);
        if(status){
            res.json({status:true,message:"otp sent succesfully"});
        }else{
            res.json({status:false,message:"otp cant sent"});
        }
    }catch(err){
        res.json({status:false,message:"signin failed,registration first!"});
    }
}

//to verify otp
export const verifyOtp=async(req,res)=>{
    const {email,otp}=req.body

    //match otp
    const record=await otpCollection.findOne({email,otp});
    if(!record){
        return res.json({status:false,message:"otp is incorrect"});
    }
    //check expiry
    if(record.expiry < new Date(Date.now())){
        return res.json({status:false,message:"otp is expired!!"});
    }
    
    try{
        const user=await userCollection.findOne({email});
        //create a jwt token and store in cookies
       const token = jwt.sign(
    { id: user._id },   // ✅ only store ID
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
);
        res.cookie("auth_token",token,{maxAge:1000*60*60,httpOnly:true,sameSite:"lax",secure:false});
         await otpCollection.deleteMany({email});
        res.json({status:true,message:"OTP verified & signin successfully"});
    }catch(err){
        res.json({status:false,message:"OTP verification failed",err:err.message});
    }
}

//for signout user
export const signout=async(req,res)=>{
   res.clearCookie("auth_token", {
  httpOnly: true,
  sameSite: "lax",
  secure: false,
});
    res.json({status:true,message:"signout successfully"});
}

// check status user authorized or not 
export const checkLoginStatus=(req,res)=>{
    try{
        const token=req.cookies.auth_token;
        if(!token){
            return res.json({status:false,message:"signin first"});
        }  
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return res.json({status:true,message:"Alreday Logged In",user:decoded});
    }catch(err){
        res.json({status:false,message:"Logged out ,Login First to access"});
    }
}

export const changePassword=async(req,res)=>{
    const {email,oldPassword,newPassword}=req.body;

   try{
    const user=await authCollection.findOne({email});
   if(!user){
    return res.json({status:false,message:"user not found!!"});
   }
   const isMatch=await bcrypt.compare(oldPassword,user.password);
   if(!isMatch){
    return res.json({status:false,message:"old password is invalid!"});
   }

   const hashed=await bcrypt.hash(newPassword,12);
   await authCollection.updateOne({email},{$set:{password:hashed}})
   res.json({status:true,message:"new password set successfully"});
   }catch(err){
    res.json({status:false,message:err.message});
   }
}

export const forgotPassword=async(req,res)=>{
    const{email}=req.body;

  try{  
const status =await sendOtp(email);
     if(status){
         res.json({status:true,message:"OTP Sent successfully!"});
    }
   }
   catch(err){
    res.json({status:false,message:err.message});
   }
} 

export const changeForgotPassword=async(req,res)=>{
    const{email,otp,newPassword}=req.body;
    try{
    const record=await otpCollection.findOne({email,otp});
    if(!record){
        return res.json({status:false,message:"Invlaid Otp  "});
    }
    
    if(record.expiry<new Date(Date.now())){
        return res.json({status:false,message:"otp expired"});
    }

    const hashed=await bcrypt.hash(newPassword,12);
    await authCollection.updateOne({email},{$set:{password:hashed}});
     await otpCollection.deleteMany({ email });
    res.json({message:"new password set succesfully"});
    }catch(err){
        res.json({status:false,err:err.message});
    }
}