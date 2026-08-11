import { Router } from "express";
import {
  addBrand,
  getAllBrands,
  getBrand,
  updateBrand,
  deleteBrand,
} from "./brand.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";

const brandRouter = Router();

brandRouter
  .route("/")
  .get(getAllBrands)
  .post(uploadSingleFile("logo", "brands"), addBrand);
brandRouter
  .route("/:id")
  .get(getBrand)
  .put(uploadSingleFile("logo", "brands"), updateBrand)
  .delete(deleteBrand);

export default brandRouter;
