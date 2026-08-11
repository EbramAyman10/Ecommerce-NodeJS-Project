import { Router } from "express";
import {
  addSubCategory,
  getAllSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "./subCategory.controller.js";

const subCategoryRouter = Router({ mergeParams: true });

subCategoryRouter.route("/").get(getAllSubCategories).post(addSubCategory);
subCategoryRouter
  .route("/:id")
  .get(getSubCategory)
  .put(updateSubCategory)
  .delete(deleteSubCategory);

export default subCategoryRouter;
