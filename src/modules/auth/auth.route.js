import { Router } from "express";
import { checkEmail } from "../../middleware/checkEmail.js";
import {
  allowedTo,
  changeUserPassword,
  protectedRoutes,
  signin,
  signup,
} from "./auth.controller.js";
import { signinValid, signupValid, verifyValid } from "./auth.validation.js";
import { validate } from "../../middleware/validate.js";

const authRouter = Router();

authRouter.post("/signup", validate(signupValid), checkEmail, signup);
authRouter.post("/signin", validate(signinValid), signin);
authRouter.patch(
  "/change-password",
  protectedRoutes,
  allowedTo("user"),
  changeUserPassword,
);

export default authRouter;
