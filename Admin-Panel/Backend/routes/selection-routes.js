import express from 'express'
import { addDepartment, readDepartment } from '../controllers/selection-controller.js';

const router=express.Router();

router.get("/",readDepartment);
router.post("/",addDepartment);

export default router;