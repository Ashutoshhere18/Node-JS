import express from "express"
import {MongoClient} from "mongodb"

const app=express();
app.use(express.json())

const client = new MongoClient("mongodb://127.0.0.1:27017");

const connectDB=async()=>{
   await client.connect();
   console.log("MongoDB connected....!!");

  const db= client.db("School");
  return db;
}

const addStudent=async(student)=>{
    const db=await connectDB();
    const result=await db.collection("student").insertOne(student);
    return result;
};



const readStudent=async()=>{
const db=await connectDB();
const data=await db.collection("student").find().toArray();
// console.log(data[0]._id.toJSON());
return data;
};


app.get("/api",async(req,res)=>{
    const  data= await readStudent();
    res.json(data);
});

app.post("/api",async(req,res)=>{
  const student= req.body;
  const result=await addStudent(student);
  res.json(result);
   console.log("Student added successfulyy..!");
});


app.listen(4000,()=>{
    console.log("Server Started at 4000...");
})