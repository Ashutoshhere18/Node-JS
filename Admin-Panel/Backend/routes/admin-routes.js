import express from 'express'
import { getAllUsers, getCurrentUser, updateUser } from '../controllers/admin-controller.js';

const router=express.Router();

router.post('/update-user',updateUser);
router.get('/get-users',getAllUsers);
router.get('/get-current-user',getCurrentUser);

export default router;
