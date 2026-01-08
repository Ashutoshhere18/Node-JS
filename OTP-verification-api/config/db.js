import mongoose from 'mongoose'

export const connectDB=async()=>{
   try{
     await mongoose.connect("mongodb://localhost:27017/OTP_Verify");
     console.log("MongoDB Connected!");
   }catch(err){
    console.log("Failed in connecting MongoDB!");
   }
}