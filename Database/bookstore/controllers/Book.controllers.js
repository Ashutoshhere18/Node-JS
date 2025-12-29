import {BookModel} from '../models/Book.model.js'

export const addBook=async(req,res)=>{
  try{
    const result= await BookModel.create(req.body);
    res.status(201).json({msg:"Book added successfully!...",result})
  }
  catch(err){
    res.json({msg:"Book not added ",err});
  }
}

export const readBooks=async(req,res)=>{
    try{
        const data=await BookModel.find();
        res.json(data);
    }
    catch(err){
        res.json("Can't fetch Books",err);
    }
};

export const updateBook=async(req,res)=>{
    try{
       const result=await  BookModel.updateone(req.body);
       res.json({msg:"Book Updated successfully!..",result});

    }
    catch(err){
        res.json({msg:"Book Not updated ",err:err});
    }
};
