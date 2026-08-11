import joi from "joi";

const signupValid = joi.object({
  name: joi.string().min(3).max(20).required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .pattern(/^[A-Z][A-Za-z0-9]{8,40}$/)
    .required(),
  rePassword: joi.valid(joi.ref("password")).required(),
});
const signinValid = joi.object({
  email: joi.string().email().required(),
  password: joi
    .string()
    .pattern(/^[A-Z][A-Za-z0-9]{8,40}$/)
    .required(),
});

const verifyValid = joi.object({
  OTP: joi.string().length(6).required(),
  email: joi.string().email().required(),
});

export { signupValid, signinValid, verifyValid };
