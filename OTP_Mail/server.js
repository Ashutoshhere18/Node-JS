import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import express from 'express'

dotenv.config();

const app=express();

export const transporter=nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:process.env.EMAIL,
    pass:process.env.PASS
  }
})

console.log(process.env.PASS,process.env.EMAIL);

const sendMail=async()=>{
    transporter.sendMail({
        from:`OTP Service <${process.env.EMAIL}>`,
        to:"atmishra.webdev@gmail.com",
        subject:"Your OTP Code",
        text:"Your OTP is 123432 expires in 2 minutes"
    })
}

app.post("/",async(req,res)=>{
    await sendMail();
    res.json({message:"Otp sended successfully!"});
})

app.listen(4040,()=>{
    console.log("Server Started Successfully!..");
})