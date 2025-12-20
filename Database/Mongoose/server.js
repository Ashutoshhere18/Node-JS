import express from "express"
import mongoose from "mongoose"

const app=express();
app.use(express.json());

const connectDB=async()=>{
   await mongoose.connect("mongodb://localhost:27017/Company");
   console.log("MongoDB connected...!!");
};

 connectDB();

const companySchema= new mongoose.Schema({
    name:String,
    year:Number,
    owner:String,
    netWorth:Number
});


 const Company=mongoose.model("Company",companySchema);
 
 const addCompany=async()=>{
   const company=new Company({
        name:"Tata",
        year:1997,
        owner:"Ratan Tata",
        netWorth:120000
    });
  const result= await company.save();
  return result;
 };



app.post("/",async(req,res)=>{
 const result=await addCompany();
 res.json({msg:"Company added successfully...!!"},result);
})

app.listen(4000,()=>{
    console.log("Server started at 4000....")
})
