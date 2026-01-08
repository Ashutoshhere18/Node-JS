import mongoose from 'mongoose'

const OtpSchema=new mongoose.Schema({
   email:String,
   otp:Number,
   expiry:Date
},{timestamps:true});

export const OtpModel =mongoose.model("Otp's",OtpSchema);