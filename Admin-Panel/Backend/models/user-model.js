import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    name:String,
    phone:String,
    address:String,
    education:String,
    age:String,
    exp:String,
    image:String
})

export const userCollection=mongoose.model("users",userSchema);