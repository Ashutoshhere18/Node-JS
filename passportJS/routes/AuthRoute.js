import express from 'express'
import {signup,signin,home,signout} from '../controllers/AuthController.js'
import {isAuthenticated} from '../middleware/AuthMiddleware.js'
import passport from 'passport'

const router=express.Router();


router.post("/signup",signup);
router.post("/signin",passport.authenticate("local"),signin);
router.get("/signout",signout);

router.get("/home",isAuthenticated,home);

export default router;
