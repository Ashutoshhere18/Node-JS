import mongoose from "mongoose"


const connectDB=async()=>{
    
    try{
       await mongoose.connect("mongodb://localhost:27017/BookStore");
        console.log("MongoDB Connected Successfully!...");
    }catch(err){
        console.log(err);
    }
}

export default connectDB;