import joi from "joi";

const addBrandValidation = joi.object({
  title: joi.string().min(2).max(50).required(),
  image: joi
    .object({
      fieldname: joi.string().required(),
      originalname: joi.string().required(),
      encoding: joi.string().required(),
      mimetype: joi
        .string()
        .valid("image/jpeg", "image/png", "image/jpg")
        .required(),
      size: joi.number().max(5242880).required(),
      destination: joi.string().required(),
      filename: joi.string().required(),
      path: joi.string().required(),
    })
    .required(),
});
const UpdateBrandValidation = joi.object({
  image: joi
    .object({
      fieldname: joi.string().required(),
      originalname: joi.string().required(),
      encoding: joi.string().required(),
      mimetype: joi
        .string()
        .valid("image/jpeg", "image/png", "image/jpg")
        .required(),
      size: joi.number().max(5242880).required(),
      destination: joi.string().required(),
      filename: joi.string().required(),
      path: joi.string().required(),
    })
    .required(),
});

export { addBrandValidation, UpdateBrandValidation };
