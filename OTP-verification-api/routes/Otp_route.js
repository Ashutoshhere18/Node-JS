import express from 'express'
import {sendOtp,verifyOTP} from '../controllers/Otp_controller.js'

const router=express.Router();

router.post("/send",sendOtp);
router.post("/verify",verifyOTP);

export default router;