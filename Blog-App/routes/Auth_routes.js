import express from 'express'
import {isUserExists,isUserAuthenticated} from '../middlwares/Auth_Middleware.js'
import {signUp,signIn,signOut,Blog} from '../controllers/Auth_controller.js'

const router=express.Router();

router.post("/signup",isUserExists,signUp);
router.post("signin",signIn);
router.get("signout",signOut);

router.get("/blog",isUserAuthenticated,Blog);

export default router;