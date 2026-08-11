import catchError from "../../middleware/catchError.js";
import slugify from "slugify";
import { AppError } from "../../utils/appError.js";
import Brand from "../../../database/models/brand.model.js";
import { deleteOne, getAll, getOne } from "../../handlers/handlers.js";

const addBrand = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.name);
  req.body.logo = req.file.logo;
  let brand = new Brand(req.body);
  await brand.save();
  res.status(201).json({ message: "Success", brand });
});

const getAllBrands = getAll(Brand);

const getBrand = getOne(Brand);

const updateBrand = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  req.body.logo = req.file.logo;

  let brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!brand) return next(new AppError("brand not found", 404));
  res.json({ message: "Success", brand });
});
const deleteBrand = deleteOne(Brand);

export { addBrand, getAllBrands, getBrand, updateBrand, deleteBrand };
