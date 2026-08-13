import Category from "../../../database/models/category.model.js";
import catchError from "../../middleware/catchError.js";
import slugify from "slugify";
import { AppError } from "../../utils/appError.js";
import fs from "fs";
import path from "path";
import { deleteOne, getAll, getOne } from "../../handlers/handlers.js";

const addCategory = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.name);
  req.body.image = req.file.filename;
  req.body.createdBy = req.user._id;
  let category = new Category(req.body);
  await category.save();
  res.status(201).json({ message: "Success", category });
});

const getAllCategories = getAll(Category);

const getCategory = getOne(Category);

const updateCategory = catchError(async (req, res, next) => {
  if (req.body.slug) req.body.slug = slugify(req.body.name);
  let category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!category) return next(new AppError("category not found", 404));
  res.json({ message: "Success", category });
});
const deleteCategory = deleteOne(Category);

export {
  addCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
