import catchError from "../../middleware/catchError.js";
import slugify from "slugify";
import { AppError } from "../../utils/appError.js";
import Product from "../../../database/models/product.model.js";
import { deleteOne, getAll, getOne } from "../../handlers/handlers.js";

const addProduct = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  req.body.imageCover = req.files.imageCover[0].filename;
  req.body.images = req.files.images.map((image) => image.filename);
  let product = new Product(req.body);
  await product.save();
  res.status(201).json({ message: "Success", product });
});

const getAllProducts = getAll(Product);

const getProduct = getOne(Product);

const updateProduct = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product) return next(new AppError("product not found", 404));
  res.json({ message: "Success", product });
});
const deleteProduct = deleteOne(Product);
export { addProduct, getAllProducts, getProduct, updateProduct, deleteProduct };
