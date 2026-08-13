import catchError from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";
import { deleteOne, getAll, getOne } from "../../handlers/handlers.js";
import User from "../../../database/models/users.model.js";

const addUser = catchError(async (req, res) => {
  let user = new User(req.body);
  await user.save();
  user.password = undefined;
  res.status(201).json({ message: "Success", user });
});

const getAllUsers = getAll(User);

const getUser = getOne(User);

const updateUser = catchError(async (req, res, next) => {
  let user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!user) return next(new AppError("user not found", 404));
  res.json({ message: "Success", user });
});
const deleteUser = deleteOne(User);

export { addUser, getAllUsers, getUser, updateUser, deleteUser };
