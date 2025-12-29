export const logger=(req,res,next)=>{
    console.log(`Request comes from ${req.method} method by this ${req.url}..`);
    next();
}