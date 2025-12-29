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
 
 const addCompany=async(Data)=>{
   const company=new Company(Data);
  const result= await company.save();
  return result;
 };

 const removeCompany=async(id)=>{
    const result=await Company.deleteOne({_id:id});
    return result;
 };

 const getCompany=async()=>{
  const result=await Company.find();
  return result;
 }

 const updateCompany=async(id,data)=>{
  const result=await Company.findByIdAndUpdate(
    id,
    data,
    {new:true}
  );
  return result;
 }

app.get("/",async(req,res)=>{
 const result=await getCompany();
 res.json(result);
})

app.post("/",async(req,res)=>{
 const result=await addCompany(req.body);
 res.json({msg:"Company added successfully...!!"},result);
})

app.delete("/:id",async(req,res)=>{
  const result=await removeCompany(req.params.id);
  res.json({msg:"Company deleted successfully!...",result});
});

app.put("/:id",async(req,res)=>{
  const id=req.params.id;
  const data=req.body;
 const result=await updateCompany(id,data);
 res.json({msg:"Company Updated Successfully!...",result});
})
app.listen(4000,()=>{
    console.log("Server started at 4000....")
})
