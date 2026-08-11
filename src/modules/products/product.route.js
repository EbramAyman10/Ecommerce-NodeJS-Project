import { Router } from "express";
import {
  addProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "./product.controller.js";
import { uploadMixOfFile } from "../../fileUpload/fileUpload.js";

const productRouter = Router();

productRouter
  .route("/")
  .get(getAllProducts)
  .post(
    uploadMixOfFile(
      [
        { name: "imageCover", maxCount: 1 },
        { name: "images", maxCount: 10 },
      ],
      "products",
    ),
    addProduct,
  );
productRouter
  .route("/:id")
  .get(getProduct)
  .put(
    uploadMixOfFile(
      [
        { name: "imageCover", maxCount: 1 },
        { name: "images", maxCount: 10 },
      ],
      "products",
    ),
    updateProduct,
  )
  .delete(deleteProduct);

export default productRouter;
