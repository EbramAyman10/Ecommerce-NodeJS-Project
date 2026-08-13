import joi from "joi";

const addSubCategoryValidation = joi.object({
  title: joi.string().min(2).max(50).required(),
  category: joi.string().hex().length(24).required(),
});

export { addSubCategoryValidation };
