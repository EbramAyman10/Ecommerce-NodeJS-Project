import joi from "joi";

const addProductValidation = joi.object({
  title: joi.string().min(2).max(50).required(),
  description: joi.string().min(200).max(2000).required(),
  images: joi
    .array()
    .items(
      joi.object({
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
      }),
    )
    .min(1)
    .max(10)
    .required(),
  price: joi.number().min(0).required(),
  stock: joi.number().min(0).required(),
  category: joi.string().hex().length(24).required(),
  subCategory: joi.string().hex().length(24).required(),
});

export { addProductValidation };
