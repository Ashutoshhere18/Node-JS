import nodemailer from 'nodemailer'
import {otpCollection} from '../models/otp-model.js'
import dotenv from 'dotenv'

dotenv.config();

const transport= nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS
    }
});

export const sendOtp=async(email)=>{
const otp= Math.floor(100000+Math.random()*900000);

const expiry=new Date(Date.now()+1000*60*2);
   
try{

 await otpCollection.create({email,otp,expiry});
   await transport.sendMail({
     from:`Email: <${process.env.EMAIL}>`,
     to:email,
     subject:"OTP Verification",
     text:`Your OTP is ${otp}, it will expire in 2 min!`
    });
   return true;
}catch(err){
  return false;
}

}