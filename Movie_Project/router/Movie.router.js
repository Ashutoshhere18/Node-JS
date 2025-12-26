import express from 'express'
import multer from 'multer'
import {addMovie,getMovie} from "../controllers/Movie.controllers.js"
import path from 'path'
import {fileURLToPath} from 'url'

const router=express.Router();

const _filename=fileURLToPath(import.meta.url);
const _dirname=path.dirname(_filename);
const uploadPath=path.join(_dirname,"uploads");


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploadPath)
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const upload=multer({storage});

router.post("/",upload.single("image"),addBook);
router.get("/",getMovie);

export default router;