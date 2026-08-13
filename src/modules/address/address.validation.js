import joi from "joi";

const addAddressValidation = joi.object({
  city: joi.string().min(2).max(50).required(),
  street: joi.string().min(2).max(100).required(),
  phone: joi
    .string()
    .regex(/^01[0125][0-9]{8}$/)
    .length(11)
    .required(),
});

export { addAddressValidation };
