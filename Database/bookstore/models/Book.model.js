import mongoose from 'mongoose'

const bookSchema= new mongoose.Schema({
 title:{type:String,required:true},
 price:{type:Number,required:true},
 category:{type:String},
 publishedYear:{type:Number}
 

},{timestamps:true});

 const BookModel= mongoose.model("BooksList",bookSchema);
 export default BookModel;