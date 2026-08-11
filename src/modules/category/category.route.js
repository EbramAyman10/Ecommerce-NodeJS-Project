import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "./category.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { validate } from "../../middleware/validate.js";
import { addCategoryValidation } from "./category.validation.js";
import subCategoryRouter from "../subCategory/subCategory.route.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const categoryRouter = Router();

categoryRouter.use("/:categoryId/subCategories", subCategoryRouter);

categoryRouter
  .route("/")
  .get(getAllCategories)
  .post(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("image", "categories"),
    validate(addCategoryValidation),
    addCategory,
  );
categoryRouter
  .route("/:id")
  .get(getCategory)
  .put(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("image", "categories"),
    updateCategory,
  )
  .delete(protectedRoutes, allowedTo("admin"), deleteCategory);

export default categoryRouter;
