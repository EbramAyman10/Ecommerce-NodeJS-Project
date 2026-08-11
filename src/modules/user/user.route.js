import { Router } from "express";
import {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";

const userRouter = Router();

userRouter.route("/").get(getAllUsers).post(checkEmail, addUser);
userRouter.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default userRouter;
