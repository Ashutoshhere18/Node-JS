import express from 'express'
import {signup,signin,signout,verifyOtp,changePassword,forgotPassword,changeForgotPassword} from '../controllers/auth-controller.js'
import { checkLoginStatus } from '../middlewares/auth-middleware.js'
import { getCurrentUser } from '../controllers/admin-controller.js';

const router=express.Router();

router.post("/signup",signup);
router.post("/signin",signin);
router.post("/verifyOtp",verifyOtp);
router.post("/changePassword",checkLoginStatus,changePassword);
router.post("/forgotPassword",forgotPassword);
router.post("/changeForgotPassword",changeForgotPassword);
router.get( "/getCurrentUser",checkLoginStatus, getCurrentUser);

router.get("/signout",checkLoginStatus,signout);
// router.get("/checkLoginStatus",checkLoginStatus);
router.get("/checkLoginStatus", checkLoginStatus, (req, res) => {
  res.status(200).json({
    loggedIn: true,
    message: "User is logged in"
  });
});

export default router;