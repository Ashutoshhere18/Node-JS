import express from 'express'
import { getAllUsers, updateUser } from '../controllers/admin-controller';

const router=express.Router();

router.post('/update-user',updateUser);
router.get('/get-users',getAllUsers);

export default router;
