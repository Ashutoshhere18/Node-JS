import express from "express"
import {MongoClient} from "mongodb"

const client = new MongoClient("mongodb://127.0.0.1:27017");

const connectDB=async()=>{
   await client.connect();
   console.log("MongoDB connected....!!");

  const db= client.db("School");
  return db;
}

const addStudent=async()=>{
    const db=await connectDB();
    const result=await db.collection("student").insertOne({
        name:"Abhinav",
        age:18,
        phoneNo:8250417214
    });
    return result;
};



const readStudent=async()=>{
const db=await connectDB();
const data=await db.collection("student").find().toArray();
console.log(data);
// return data;
};
addStudent();
console.log(readStudent());