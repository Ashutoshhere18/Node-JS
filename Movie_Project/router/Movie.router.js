import express from 'express'
import multer from 'multer'
import {addMovie,getMovie,putMovie,deleteMovie} from "../controllers/Movie.controllers.js"
import path from 'path'
import {uploadPath} from '../server.js'

const router=express.Router();


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploadPath)
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const upload=multer({storage});

router.post("/",upload.single("image"),addMovie);
router.get("/",getMovie);
router.put("/:id",upload.single("image"),putMovie);
router.delete("/:id",deleteMovie);

export default router;