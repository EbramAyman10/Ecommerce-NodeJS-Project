import { Router } from "express";
import {
  addBrand,
  getAllBrands,
  getBrand,
  updateBrand,
  deleteBrand,
} from "./brand.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { validate } from "../../middleware/validate.js";
import {
  addBrandValidation,
  UpdateBrandValidation,
} from "./brand.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const brandRouter = Router();

brandRouter
  .route("/")
  .get(getAllBrands)
  .post(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("logo", "brands"),
    validate(addBrandValidation),
    addBrand,
  );
brandRouter
  .route("/:id")
  .get(getBrand)
  .put(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("logo", "brands"),
    validate(UpdateBrandValidation),
    updateBrand,
  )
  .delete(protectedRoutes, allowedTo("admin"), deleteBrand);

export default brandRouter;
