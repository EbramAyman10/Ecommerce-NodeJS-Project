import { Router } from "express";
import {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { signupValid } from "../auth/auth.validation.js";

const userRouter = Router();

userRouter.use(protectedRoutes, allowedTo("admin"));

userRouter
  .route("/")
  .get(getAllUsers)
  .post(validate(signupValid), checkEmail, addUser);
userRouter.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default userRouter;
