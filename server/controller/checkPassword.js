import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv'
import { errorHandler } from "../utils/error.js";
dotenv.config()

export const checkPassword=async(req,res,next)=>{
    const {password,userId}=req.body;
    const user=await UserModel.findById(userId);

    const cookieOptions = {
      http : true,
      secure : true
  }
  if (user && bcryptjs.compareSync(password, user?.password)) {

    const token= jwt.sign({ userId}, process.env.JWT_KEY, { expiresIn: "36hr" })

    res.cookie('token',token,cookieOptions).json({
      status: "success",
      message: "User logged in successfully",
      // data:user,
      token
      
    });
    // res.json({
    //   status: "success",
    //   message: "User logged in successfully",
    //   data:user,
    //   token: jwt.sign({ userId}, process.env.JWT_KEY, { expiresIn: "36hr" })
    // });
  } else {
    // res.json({ message: "Invalid login credentials" });
    // throw new Error("Invalid login credentials");
    next(errorHandler(500,"Invalid login credentials"))
  }
}

