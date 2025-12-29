import {signUp,signIn} from '../controllers/User.controller.js'
import express from 'express'
import isAuthenticated from '../middleware/logger.js'

const router=express.Router();

router.post("/signup",signUp);
router.post("/signin",signIn);

router.get("/home",isAuthenticated,(req,res)=>{
    res.json({message:"Home Page"});
})

export default router;
