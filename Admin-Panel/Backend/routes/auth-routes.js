import express from 'express'
import {signup,signin,signout,verifyOTP,changePassword,forgotPassword,changeForgotPassword} from '../controllers/auth-controller.js'
import { checkLoginStatus } from '../middlewares/auth-middleware.js'

const router=express.Router();

router.post("/signup",signup);
router.post("/signin",signin);
router.post("/verifyOtp",verifyOTP);
router.post("/changePassword",checkLoginStatus,changePassword);
router.post("/forgotPassword",checkLoginStatus,forgotPassword);
router.post("/changeForgotPassword",checkLoginStatus,changeForgotPassword);

router.get("/signout",checkLoginStatus,signout);
// router.get("/checkLoginStatus",checkLoginStatus);

export default router;