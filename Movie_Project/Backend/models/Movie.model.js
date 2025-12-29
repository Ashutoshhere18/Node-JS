import mongoose from 'mongoose'


export const movieSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    genre:{type:String,required:true},
    releaseYear:{type:Number,required:true},
    moviePoster:{type:String}
});

 const movieModel= mongoose.model("Movie",movieSchema);
 export default movieModel;