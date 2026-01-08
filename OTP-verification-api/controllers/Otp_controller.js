import mongoose from 'mongoose'
import {OtpModel} from '../models/Otp_model.js'
import {sendOtpMail} from '../services/Otp_services.js'

export const sendOtp=async(req,res)=>{
    const{email}=req.body;
   const otp= Math.floor(100000+Math.random()*90000);
   const expiry= new Date(Date.now()+2*60*1000);
    
   try{
    await OtpModel.create({email,otp,expiry});
   const status= sendOtpMail(email,otp);
   if(status){
     res.json({message:"OTP Sent Successfully!"});
   }else{
     res.json({message:"Mail can't sent!"});
   }
   }catch(err){
    res.json({message:"OTP failed to generate"});
   }
}


export const verifyOTP=async(req,res)=>{
    const{email,otp}=req.body;
  const data=await OtpModel.findOne({email,otp});
if(!data){
   return res.json({message:"OTP mismatched !"});
}
  if(data.expiry<new Date(Date.now())){
    res.json({message:"OTP expired!"});
  }

    res.json({message:"OTP Verified! !"});

}