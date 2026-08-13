import catchError from "../../middleware/catchError.js";
import slugify from "slugify";
import { AppError } from "../../utils/appError.js";
import SubCategory from "../../../database/models/subCategory.model.js";
import { deleteOne, getOne } from "../../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";

const addSubCategory = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  let subCategory = new SubCategory(req.body);
  await subCategory.save();
  res.status(201).json({ message: "Success", subCategory });
});

const getAllSubCategories = catchError(async (req, res) => {
  let filterObj = {};
  if (req.params) filterObj.categoryId = req.params.categoryId;

  let apiFeatures = new ApiFeatures(SubCategory.find(filterObj), req.query)
    .pagination()
    .filter()
    .fields()
    .sort()
    .search();
  let SubCategories = await apiFeatures.mongooseQuery;
  res.json({ message: "Success", page: apiFeatures.pageNumber, SubCategories });
});

const getSubCategory = getOne(SubCategory);

const updateSubCategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  let subcategory = await SubCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    },
  );
  if (!subcategory) return next(new AppError("subcategory not found", 404));
  res.json({ message: "Success", subcategory });
});
const deleteSubCategory = deleteOne(SubCategory);

export {
  addSubCategory,
  getAllSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
