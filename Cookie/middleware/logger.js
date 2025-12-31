import userModel from '../Model/User.model.js'
 const isAuthenticated=(req,res,next)=>{
  if(req.cookies.auth){
    next();
  }
  else{
    res.json({message:"Login is Mandatory!.."});
  }
}

export const isUserAlreadyExist=async(req,res,next)=>{
  const{email}=req.body;
  const userExist=await userModel.findOne({email});
  if(!userExist){
   next();
  }else{
    res.json({message:"User ALready Exist!"})
  }
}
export default isAuthenticated