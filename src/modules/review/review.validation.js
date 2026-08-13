import joi from "joi";

const addReviewValidation = joi.object({
  comment: joi.string().min(10).max(100).required(),
  product: joi.string().hex().length(24).required(),
  rate: joi.number().min(0).max(5).required(),
});

export { addReviewValidation };
