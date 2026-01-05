import jwt from 'jsonwebtoken'

export const isAuthenticated=async(req,res,next)=>{
  
    const token=req.headers.authorization.split(" ")[1];

    if(!token){
      res.json({msg:"token missing!.."});
    }
    try{
        const decoded=jwt.verify(token,"#$%^&**&^%$#");
        req.user=decoded;
        req.token=token;
        next();  
    }catch(err){
        res.json({msg:"Invalid Token",err});
    }
}