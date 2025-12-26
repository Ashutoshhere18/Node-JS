
import movieModel from '../models/Movie.model.js'
import fs from 'fs'
import path from 'path'
import {_dirname} from '../server.js'

export const addMovie=async(req,res)=>{
  
    try{
    const result= await movieModel.create({
        title:req.body.title,
        description:req.body.description,
        genre:req.body.genre,
        releaseYear:req.body.releaseYear,
        moviePoster:req.file.filename
    });
    res.json({message:"Movie Added Successfully!...",result});
    }catch(err){
     res.status(400).json({message:"Movie Not Added"});
    }
}

export const getMovie=async(req,res)=>{
    try{
    const result=await movieModel.find();
    res.json(result);
    }catch(err){
     res.json({mesaage:"Can't fetch Movies",err:err});
    }
}

export const putMovie=async(req,res)=>{
    try{
        const result=await movieModel.findByIdAndUpdate(
            req.params.id,
            req.body
        )
        res.json({message:"Movie Updated!..",result})
    }catch(err){
    res.json({message:"Movie Not Updated",err:err})
    }
}

export const deleteMovie=async(req,res)=>{
    try{
    const movie=await movieModel.findById(req.params.id);
    const deletePath=path.join(_dirname,"uploads",movie.moviePoster)

    if(fs.existsSync(deletePath)){
  fs.unlinkSync(deletePath)
    }
    await movieModel.findByIdAndDelete(req.params.id)
   res.json({message:"Movie Deleted!.."})
    }catch(err){
    res.status(401).json({message:"Movie Not Deleted!",err:err})
    }
}