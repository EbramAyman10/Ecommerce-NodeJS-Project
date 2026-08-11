import { AppError } from "../utils/appError.js";

export const validate = (schema) => {
  return (req, res, next) => {
    const data = {
      ...req.body,
      ...req.params,
      ...req.query,
    };

    if (req.file) {
      data[req.file.fieldname] = req.file;
    }
    if (req.files) {
      Object.assign(data, req.files);
    }

    const { error } = schema.validate(data, { abortEarly: false });

    if (!error) {
      next();
    } else {
      const errMsgs = error.details.map((err) => err.message);

      next(new AppError(errMsgs, 401));
    }
  };
};
