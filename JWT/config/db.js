import mongoose from 'mongoose'

export const connectDB=async()=>{
  try{
 mongoose.connect('mongodb://localhost:27017/User');
 console.log("MongoDB connected successfully!.");
  }catch(err){
console.log("MongoDB Not connected !.",err);
  }
} 