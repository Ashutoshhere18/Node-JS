import {otpModel} from '../models/Otp_Model.js'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config();

const transporter=nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:process.env.EMAIL,
    pass:process.env.PASS
  }
});

export const sendMail=async(email)=>{
   
    const otp= Math.floor(100000+Math.round()*90000);
    const expiry=new Date(Date.now()+2*1000*60);

    await otpModel.deleteMany({email});

    await otpModel.create({email,otp,expiry});

    transporter.sendMail({
        from:`OTP Services <${process.env.EMAIL}>`,
        to:email,
        subject:"OTP Verification",
        text:`Otp is ${otp}, it will expire in 2 minutes`
    })
    return true
}
