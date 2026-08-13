import catchError from "../../middleware/catchError.js";
import slugify from "slugify";
import { AppError } from "../../utils/appError.js";
import Product from "../../../database/models/product.model.js";
import { deleteOne, getAll, getOne } from "../../handlers/handlers.js";
import { deleteFiles } from "../../utils/deleteImages.js";

const addProduct = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  req.body.imageCover = req.files.images[0].filename;
  req.body.images = req.files.images.map((image) => image.filename);
  req.body.createdBy = req.user._id;
  let product = new Product(req.body);
  await product.save();
  res.status(201).json({ message: "Success", product });
});

const getAllProducts = getAll(Product);

const getProduct = getOne(Product);

const updateProduct = catchError(async (req, res, next) => {
  if (req.body.title) req.body.slug = slugify(req.body.title);

  let product = await Product.findById(req.params.id);
  if (!product) return next(new AppError("product not found", 404));
  if (req.files.images && product.images) {
    deleteFiles("products", product.images);
    product.imageCover = req.files.images[0].filename;
    product.images = req.files.images.map((image) => image.filename);
  }

  await product.save();
  res.json({ message: "Success", product });
});
const deleteProduct = deleteOne(Product);
export { addProduct, getAllProducts, getProduct, updateProduct, deleteProduct };
