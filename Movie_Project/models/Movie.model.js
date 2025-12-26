import mongoose from 'mongoose'
import express from 'express'

export const movieSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    genre:{type:String,required:true},
    realeaseYear:{type:Number,required:true},
    moviePoster:{type:String}
});

export const movieModel= mongoose.model("Movie",movieSchema);