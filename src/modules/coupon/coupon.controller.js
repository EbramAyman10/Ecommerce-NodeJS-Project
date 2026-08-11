import catchError from "../../middleware/catchError.js";

import { AppError } from "../../utils/appError.js";
import Coupon from "../../../database/models/coupon.model.js";
import { deleteOne, getAll, getOne } from "../../handlers/handlers.js";

const addCoupon = catchError(async (req, res) => {
  let isExist = await Coupon.findOne({ code: req.body.code });
  if (isExist) return next(new AppError("code is exist", 409));
  let coupon = new Coupon(req.body);
  await coupon.save();
  res.status(201).json({ message: "Success", coupon });
});

const getAllCoupons = getAll(Coupon);

const getCoupon = getOne(Coupon);

const updateCoupon = catchError(async (req, res, next) => {
  let coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!coupon) return next(new AppError("coupon not found", 404));
  res.json({ message: "Success", coupon });
});
const deleteCoupon = deleteOne(Coupon);

export { addCoupon, getAllCoupons, getCoupon, updateCoupon, deleteCoupon };
