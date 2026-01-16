import {authCollection} from '../models/auth-model.js'
import bcrypt from 'bcrypt'
import {sendOTP} from '../services/otp-services.js'

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

}

export const signout=async(req,res)=>{}