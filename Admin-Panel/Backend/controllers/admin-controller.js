import { userCollection } from "../models/user-model.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { authCollection } from "../models/auth-model.js";

dotenv.config();

// export const addUser=async(req,res)=>{
//     try{
//         await userCollection.create(req.body);
//         return res.json({status:true,message:"user added successfully"});
//     }catch(err){
//         res.json({status:false,message:err.message});
//     }
// }

export const updateUser = async (req, res) => {
  try {
    const { _id, ...updateData } = req.body;

    const updatedUser = await userCollection.findByIdAndUpdate(
      _id,
      { $set: updateData },
      { new: true },
    );

    return res.json({
      status: true,
      message: "Employee updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    return res.json({ status: false, message: err.message });
  }
};
export const getAllUser = async (req, res) => {
  const { skip, limit } = req.query;
  try {
    // const user = await userCollection.find()
    const user = await authCollection
      .find()
      .populate("user")
      .skip(skip)
      .limit(limit);
    return res.json({
      status: true,
      message: "all users fetched successfully!",
      user,
    });
  } catch (err) {
    return res.json({ status: false, message: err.message });
  }
};

export const getAllUsersByRole = async (req, res) => {
  const { role } = req.query;
  try {
    let users = await authCollection.find().populate("user");
    users = users.filter((user) => user.user.role == role);
    return res.json({
      status: true,
      message: "all users fetched using role!",
      users,
    });
  } catch (err) {
    return res.json({ status: false, message: err.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.auth_token;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await userCollection.findById(decoded.id);
    return res.json({
      status: true,
      message: "user fetched successfully !",
      user: user,
    });
  } catch (err) {
    return res.json({ status: false, message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.query.id;
  try {
    await userCollection.findByIdAndDelete(id);
    return res.json({
      status: true,
      message: "Employee deleted successfully!!",
    });
  } catch (err) {
    return res.json({ status: false, message: err.message });
  }
};
