import {DepartmentCollection }from '../models/department-model.js'

export const addDepartment=async(req,res)=>{
    const {name}=req.query;
    try{
 await DepartmentCollection.create({name});
 return res.json({status:true,message:"Department Added successfully!"});
    }catch(err){
 return res.json({status:false,message:err.message});
    }
}
export const readDepartment=async(req,res)=>{
 try{
 const department=await DepartmentCollection.find();
 return res.json({status:true,message:"Department fetched successfully!",department});
 }catch(err){
 return res.json({status:false,message:err.message});
    }
}
export const updateDepartment=(req,res)=>{}
export const deleteDepartment=(req,res)=>{}