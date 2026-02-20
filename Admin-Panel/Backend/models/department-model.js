import mongoose from 'mongoose'

const departmentSchema= new mongoose.Schema({
    name:String
})

export const DepartmentCollection=mongoose.model("Department",departmentSchema);
