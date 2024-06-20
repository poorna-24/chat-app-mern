import UserModel from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const registerUser = async (req, res, next) => {
  const { name, email, password, profile_pic } = req.body;

  //Check user exists
  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    next(errorHandler(400, "User already exists"));
    // throw new Error("User already exists");
  }
  //hash password
  const hashedPassword = bcryptjs.hashSync(password, 10);
  //create the user
  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    profile_pic,
  });
  res.status(201).json({
    status: "success",
    message: "User Registered Successfully",
    data: user,
  });
};
