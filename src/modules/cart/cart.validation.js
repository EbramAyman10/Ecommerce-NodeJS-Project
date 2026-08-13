import joi from "joi";

const addCartValidation = joi.object({
  product: joi.string().hex().length(24).required(),
  quantity: joi.number().min(0).required(),
});
const updateCartValidation = joi.object({
  quantity: joi.number().min(0).required(),
  id: joi.string().hex().length(24),
});

export { addCartValidation, updateCartValidation };
