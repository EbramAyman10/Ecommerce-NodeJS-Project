import { Router } from "express";
import { checkEmail } from "../../middleware/checkEmail.js";
import {
  changeUserPassword,
  signin,
  signup,
} from "./auth.controller.js";
import { signinValid, signupValid, verifyValid } from "./auth.validation.js";
import { validate } from "../../middleware/validate.js";

const authRouter = Router();

authRouter.post("/signup", validate(signupValid), checkEmail, signup);
authRouter.post("/signin", validate(signinValid), signin);
authRouter.patch("/change-password", changeUserPassword);

export default authRouter;
