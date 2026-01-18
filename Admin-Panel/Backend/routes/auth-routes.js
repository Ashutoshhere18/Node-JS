import express from 'express'
import {signup,signin,signout,verifyOtp,checkLoginStatus} from '../controllers/auth-controller.js'

const router=express.Router();

router.post("/signup",signup);
router.post("/signin",signin);
router.post("/verifyOtp",verifyOtp);

router.get("/signout",signout);
router.get("/checkLoginStatus",checkLoginStatus);

export default router;