import User from "../../database/models/users.model.js";
import { AppError } from "../utils/appError.js";

export const checkEmail = async (req, res, next) => {
  const isExist = await User.findOne({ email: req.body.email });
  if (isExist) return next(new AppError("email already exists", 409));

  next();
};
