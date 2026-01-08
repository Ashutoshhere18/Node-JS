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
console.log(process.env.EMAIL,process.env.PASS);

export const sendOtpMail=async(email,otp)=>{
 try{
    await transporter.sendMail({
    from:`OTP Services <${process.env.EMAIL}>`,
    to:email,
    subject:"OTP Verification",
    text:`OTP is-${otp}, it will expire in 2 minutes. Kindly do not share OTP with anyone!`
 });
 return true;
 }catch(err){
 return false;
 }
};

