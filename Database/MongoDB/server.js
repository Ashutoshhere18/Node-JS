import express from "express"
import {MongoClient} from "mongodb"
import {ObjectId} from "mongodb"


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

const UpdateStudent=async(id,updatedData)=>{
    const db=await connectDB();
   const result =await db.collection("student").updateOne(
        { _id:new ObjectId(id)},
        {$set:updatedData}
    );
    return result;
};

const deleteStudent=async(id)=>{
    const db=await connectDB();

    const result=await db.collection("student").deleteOne(
        {_id:new ObjectId(id)}
    );
    return result;
}

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

app.put("/api/:id",async(req,res)=>{

    const id=req.params.id;
    const updatedData=req.body;
//   const db=await connectDB();
    const result= await UpdateStudent(id,updatedData);
    if(result.matchedCount===0){
       return res.status(404).json({message:"Student Not found..."})
    }
    res.json({message:"Student Updated successfully..."})
});

app.delete("/api/:id",async(req,res)=>{
  const id=req.params.id;

  const result=await deleteStudent(id);
   if(result.deletedCount===0){
       return res.status(404).json({message:"Student Not found..."})
    }
    res.json({message:"Student Deleted successfully..."})
})

app.listen(4000,()=>{
    console.log("Server Started at 4000...");
})