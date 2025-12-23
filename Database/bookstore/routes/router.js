import {addBook,readBooks,updateBook} from "../controllers/Book.controllers.js"
import express from 'express'

const router=express.Router();

router.post("/",addBook);
router.get("/",readBooks); 
router.put("/",updateBook);

export default router;