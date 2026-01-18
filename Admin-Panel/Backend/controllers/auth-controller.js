import {authCollection} from '../models/auth-model.js'
import {otpCollection} from '../models/otp-model.js'
import bcrypt from 'bcrypt'
import {sendOTP} from '../services/otp-services.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export const signup=async(req,res)=>{
    try{
     const{email,password}=req.body;
     const hashed=await bcrypt.hash(password,12);
     await authCollection.create({email,password:hashed});
     res.json({status:true,message:"User registered !!"});
    }catch(err){
     res.json({status:false,message:"User registeration failed !!"});
    }
}

export const signin=async(req,res)=>{
    const{email,password}=req.body;
    
    // step 1: To check user exist in database or not 
    const user=await authCollection.findOne({email});
    if(!user){
       return res.json({status:false,message:"User Not Found!"});
    }

    //step 2: Check password matches or not 
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
       return res.json({status:false,message:"Incorrect Password!"});
    }

    // step 3: send Otp after checking password
    const status=await sendOTP(email);
    if(status){
         res.json({status:true,message:"OTP Sent successfully!"});
    }else{
         res.json({status:false,message:"OTP Can't Sent !"});
    }
};

export const verifyOTP=async(req,res)=>{
const{email,otp}=req.body;

//Check otp
const record=await otpCollection.findOne({email,otp});

if(!record){
   return res.json({status:false,message:"OTP is incorrect!"});
}

//check Expiry

if(record.expiry<new Date(Date.now())){
 return res.json({status:false,message:"OTP Expired!"});
}

await otpCollection.deleteMany({email});

try{
  // For generating jwt and store it in cookie for current logged i n user
  const user=await authCollection.findOne({email});
  const token= jwt.sign(user,process.env.SECRET_KEY,{
    expiresIn:"1h"
  });

  res.cookie("auth_token",token,{
    maxAge:1000*60*60,
    httpOnly:true
  });

  res.json({status:true,message:"OTP Verified and Sign in done!"});
}catch(err){
    res.json({status:false,message:"OTP Verification failed!",err});
}
}

export const signout=async(req,res)=>{
    res.clearCookie("auth_token");
    res.json({status:true,message:"User Signout Successfully!"})
}

export const checkLoginStatus=async(req,res)=>{
    try{
    // Step 1: Finding Token
    const token=req.cookies.auth_token;

    //Step 2: If token not found
    if(!token){
        return res.json({status:false,message:"Sign In first!"});

    // Step 3: Verify jwt token
    const decoded= jwt.verify(token,process.env.SECRET_KEY,{expiresIn:"1h"})
    return res.json({status:true,message:"User Already Logged in!",user:decoded.payload});
    }
    }catch(err){
    return res.json({status:false,message:"Sign in first!",err});
    }
}   