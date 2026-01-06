import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    email:String,
    password:String
},{timestamps:true})

export const userModel= mongoose.model("Users",userSchema);
