import catchError from "../middleware/catchError.js";
import { ApiFeatures } from "../utils/apiFeatures.js";
import { AppError } from "../utils/appError.js";

const deleteOne = (model) => {
  return catchError(async (req, res, next) => {
    let document = await model.findByIdAndDelete(req.params.id);
    if (!document) return next(new AppError("document not found", 404));
    res.json({ message: "Success", document });
  });
};

const getAll = (model) => {
  return catchError(async (req, res) => {
    let apiFeatures = new ApiFeatures(model.find(), req.query)
      .pagination()
      .filter()
      .fields()
      .sort()
      .search();
    let document = await apiFeatures.mongooseQuery;
    res.json({ message: "Success", page: apiFeatures.pageNumber, document });
  });
};

const getOne = (model) => {
  return catchError(async (req, res, next) => {
    let document = await model.findById(req.params.id);
    if (!document) return next(new AppError("document not found", 404));
    res.json({ message: "Success", document });
  });
};

export { deleteOne, getAll, getOne };
