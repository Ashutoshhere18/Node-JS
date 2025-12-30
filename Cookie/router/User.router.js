import {signUp,signIn,home,signInHtml,signUpHtml} from '../controllers/User.controller.js'
import express from 'express'
import isAuthenticated from '../middleware/logger.js'

const router=express.Router();

router.post("/api/signup",signUp);
router.post("/api/signin",signIn);

router.get('/signin',signInHtml);
router.get('/signup',signUpHtml);
router.get('/home',isAuthenticated,home);



export default router;
