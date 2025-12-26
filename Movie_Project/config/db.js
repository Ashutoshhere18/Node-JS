import mongoose from 'mongoose'

export const connectDB=async()=>{
  try{
    await mongoose.connect ("mongodb://localhost:27017/movieManager");
    console.log("MongoDB connected!....")
  }catch(err){
     console.log("Not connected!!..",err)
  }
};