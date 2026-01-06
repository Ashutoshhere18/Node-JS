import {Users}  from '../models/AuthModel.js'
import bcrypt from 'bcrypt'

export const signup=async(req,res)=>{

try{
    const {email,password}=req.body;
    const hashedPassword=await bcrypt.hash(password,10);
    Users.create({
        email,password:hashedPassword
    });
    res.json({message:"User Registered!.."});
    
}catch(err){
   res.json({message:"User not registered!.."})
}

}

export const signin=async(req,res)=>{
    res.json({message:"User SignIn successfully!",user:req.user});
}

export const signout=async(req,res)=>{
    req.logout(()=>{
        res.json({message:"Logout success!.."});
    });
};

export const home=async(req,res)=>{
    res.json({message:"Home Page accessed!",user:req.user});

}
