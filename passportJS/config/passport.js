import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import bcrypt from 'bcrypt'
import {Users} from '../models/AuthModel.js'


const localStrategy=new LocalStrategy({usernameField:"email"},async(email,password,done)=>{
    try{
    const user=await Users.findOne({email});

    if(!user){
      return done(null,false,{message:"User Not Found!.."});
    }

    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
    return done(null,false,{message:"Password is Incorrect!.."});
    }
  
    return done(null,user);
    }catch(err){
       return done(err);
    }
});

passport.use(localStrategy);

passport.serializeUser((user,done)=>{
    done(null,user._id);
});

passport.deserializeUser(async(id,done)=>{
    const user=await Users.findById(id);
    done(null,user);
});