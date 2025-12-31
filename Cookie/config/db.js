import mongoose from 'mongoose'

export const connectDB=async()=>{
   try{
   await mongoose.connect("mongodb://localhost:27017/User-Cookie");
    console.log("MongoDB connected!...")
   }catch(err){
    console.log("MongoDB not connected!...")
   }
} ;