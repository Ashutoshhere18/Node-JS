import express from 'express'
import { getAllUser, getCurrentUser, updateUser, getAllUsersByRole,deleteUser} from '../controllers/admin-controller.js';
import {checkLoginStatus} from '../middlewares/auth-middleware.js'

const router=express.Router();

router.put('/update-user',checkLoginStatus,updateUser);
router.get('/get-users',checkLoginStatus,getAllUser);
router.get('/get-current-user',checkLoginStatus,getCurrentUser);

router.get("/get-user-by-role",getAllUsersByRole);

router.delete("/delete-user",deleteUser);

export default router;
