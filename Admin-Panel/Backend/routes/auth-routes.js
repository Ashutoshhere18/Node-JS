import express from 'express'
import {signup,signin,signout,verifyOTP,checkLoginStatus,changePassword,forgotPassword,changeForgotPassword} from '../controllers/auth-controller.js'

const router=express.Router();

router.post("/signup",signup);
router.post("/signin",signin);
router.post("/verifyOtp",verifyOTP);
router.post("/changePassword",changePassword);
router.post("/forgotPassword",forgotPassword);
router.post("/changeForgotPassword",changeForgotPassword);

router.get("/signout",signout);
router.get("/checkLoginStatus",checkLoginStatus);

export default router;