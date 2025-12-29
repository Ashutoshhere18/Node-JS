
 const isAuthenticated=(req,res,next)=>{
  if(req.cookies.auth){
    next();
  }
  else{
    res.json({message:"Login is Mandatory!.."});
  }
}

export default isAuthenticated