import UserModel from "./../models/userModel.js";
import { errorHandler } from "./../utils/error.js";

export const checkEmail = async (req, res, next) => {
  const { email } = req.body;
  const checkEmail = await UserModel.findOne({ email }).select("-password");

  if (!checkEmail) {
    next(errorHandler(500, "Email not found"));
  }
  res.status(200).json({
    message: "Email verify",
    success: true,
    data: checkEmail,
  });
};
