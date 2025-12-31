import mongoose from 'mongoose'

export const users=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
})

const userModel=mongoose.model("Users",users);
export default userModel;