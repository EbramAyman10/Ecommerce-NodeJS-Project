import { Router } from "express";
import {
  addSubCategory,
  getAllSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "./subCategory.controller.js";
import { validate } from "../../middleware/validate.js";
import { addSubCategoryValidation } from "./subcategory.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const subCategoryRouter = Router({ mergeParams: true });

subCategoryRouter
  .route("/")
  .get(getAllSubCategories)
  .post(
    protectedRoutes,
    allowedTo("admin"),
    validate(addSubCategoryValidation),
    addSubCategory,
  );
subCategoryRouter
  .route("/:id")
  .get(getSubCategory)
  .put(protectedRoutes, allowedTo("admin"), updateSubCategory)
  .delete(protectedRoutes, allowedTo("admin"), deleteSubCategory);

export default subCategoryRouter;
