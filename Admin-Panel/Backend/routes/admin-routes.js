import express from 'express'
import { getAllUsers, getCurrentUser, updateUser } from '../controllers/admin-controller.js';
import {checkLoginStatus} from '../middlewares/auth-middleware.js'

const router=express.Router();

router.put('/update-user',checkLoginStatus,updateUser);
router.get('/get-users',checkLoginStatus,getAllUsers);
router.get('/get-current-user',checkLoginStatus,getCurrentUser);

export default router;
