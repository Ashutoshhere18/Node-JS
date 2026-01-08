export const isAuthenticated=(req,res,next)=>{

    if(req.isAuthenticated()){
        return next();
    }
    res.status(403).json({message:"Unauthorised User!,Please login first.."});
}