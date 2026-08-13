import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { AppError } from "../../utils/appError.js";
import catchError from "../../middleware/catchError.js";
import User from "../../../database/models/users.model.js";

const signup = catchError(async (req, res) => {
  let user = new User(req.body);
  await user.save();
  jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_KEY,
    (err, token) => {
      res.status(201).json({ message: "registerd", token });
    },
  );
});

const signin = catchError(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
    return next(new AppError("incorrect email or password", 401));
  }
  jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_KEY,
    (err, token) => {
      res.status(200).json({ message: "login", token });
    },
  );
});

const changeUserPassword = catchError(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user || !bcrypt.compareSync(req.body.oldPassword, user.password)) {
    return next(new AppError("incorrect email or password", 401));
  }
  await User.findOneAndUpdate(
    { email: req.body.email },
    { password: req.body.newPassword, passwordChangedAt: Date.now() },
  );
  jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_KEY,
    (err, token) => {
      res.status(200).json({ message: "password has changed", token });
    },
  );
});

const protectedRoutes = catchError(async (req, res, next) => {
  let { token } = req.headers;
  let userPayload = null;
  if (!token) return next(new AppError("token not provided", 401));

  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) return next(new AppError(err, 401));
    userPayload = payload;
  });

  let user = await User.findById(userPayload.userId);
  if (!user) return next(new AppError("user not found", 401));

  if (user.passwordChangedAt) {
    let time = parseInt(user.passwordChangedAt.getTime() / 1000);
    if (time > userPayload.iat)
      return next(new AppError("invalid token .... login again", 401));
  }

  req.user = user;
  next();
});

const allowedTo = (...roles) => {
  return catchError(async (req, res, next) => {
    if (roles.includes(req.user.role)) return next();

    return next(
      new AppError("you are not authorized to access this endpoint", 403),
    );
  });
};


export {
  signup,
  signin,
  changeUserPassword,
  protectedRoutes,
  allowedTo,
};
