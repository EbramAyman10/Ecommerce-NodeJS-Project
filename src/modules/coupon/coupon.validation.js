import joi from "joi";

const addCouponValidation = joi.object({
  code: joi.string().min(2).max(50).required(),
  expireDate: joi.date().required(),
  discount: joi.number().min(1).required(),
});

export { addCouponValidation };
