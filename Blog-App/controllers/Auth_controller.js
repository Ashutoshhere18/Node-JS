import {authModel} from '../models/Auth_Models.js'
import bcrypt from 'bcrypt'


export const signUp=async(req,res)=>{
try{
        const{email}=req.body.email;
    const hashedPassword=await bcrypt.hash(req.body.password,10);
   await authModel.create({email,password:hashedPassword});
   res.json({message:"User Sign Up successfully!"});
}catch(err){
   res.json({message:"SignUp not done!",err:err});
}

}


export const signIn=async(req,res)=>{
    try{
        const{email,password}=req.body;
          const user= authModel.findOne({email})
          if(!user){
            return res.json({message:"User Not Found!"});
          }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({message:"Password Invalid!"});
        }

        res.cookie("Authentication",true,{
            httpOnly:true,
            maxAge:1000*60*60,
            secure:false,
            sameSite:"strict"
        })
         res.json({message:"SignIn Successfully!"});
    }catch(err){
        res.json({message:"SignIn Failed!"});
    }
}

export const signOut=async(req,res)=>{
    res.clearCookie("Authentication",{
        httpOnly:true,
        secure:false,
        sameSite:"strict"
    });
    res.json({message:"User Log Out!"});
}

export const Blog=async(req,res)=>{
 const user=await authModel.find();
    res.json({message:"Blog Page",user});
}