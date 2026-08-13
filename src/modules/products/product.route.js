import { Router } from "express";
import {
  addProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "./product.controller.js";
import { uploadMixOfFile } from "../../fileUpload/fileUpload.js";
import { validate } from "../../middleware/validate.js";
import { addProductValidation } from "./product.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const productRouter = Router();

productRouter
  .route("/")
  .get(getAllProducts)
  .post(
    protectedRoutes,
    allowedTo("admin"),
    uploadMixOfFile([{ name: "images", maxCount: 10 }], "products"),
    validate(addProductValidation),
    addProduct,
  );
productRouter
  .route("/:id")
  .get(getProduct)
  .put(
    protectedRoutes,
    allowedTo("admin"),
    uploadMixOfFile(
      [
        { name: "imageCover", maxCount: 1 },
        { name: "images", maxCount: 10 },
      ],
      "products",
    ),
    updateProduct,
  )
  .delete(protectedRoutes, allowedTo("admin"), deleteProduct);

export default productRouter;
