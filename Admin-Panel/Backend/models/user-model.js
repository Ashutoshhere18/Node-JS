import mongoose from 'mongoose'

const userSchema=mongoose.Schema({
    email:{type:String,unique:true,required:true},
    name:String,
    phone:String,
    address:String,
    age:Number,
    monthlyBudget:Number,
    saving:Number,
    image:String,
    role:String
});

export const userCollection=mongoose.model("users",userSchema);