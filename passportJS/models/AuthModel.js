import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    email:String,
    password:String
},{timestamps:true})

export const Users= mongoose.model("Users",userSchema);
