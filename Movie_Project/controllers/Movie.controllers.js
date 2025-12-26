import mongoose from 'mongoose'
import express from 'express'
import movieModel from '../models/Movie.model.js'

export const addMovie=async(req,res)=>{
    try{
    const result= await movieModel.create(req.body);
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