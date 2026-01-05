import express from 'express'
import {signUp,signIn,home} from '../controllers/UserController.js'
import {isAuthenticated} from '../Middleware/AuthMiddleware.js'

const router=express.Router();

router.post("/signup",signUp);
router.post("/signin",signIn);
router.get("/home",isAuthenticated,home);

export default router;