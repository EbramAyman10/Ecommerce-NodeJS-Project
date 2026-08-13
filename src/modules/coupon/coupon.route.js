import { Router } from "express";
import {
  addCoupon,
  getAllCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
} from "./coupon.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { addCouponValidation } from "./coupon.validation.js";

const couponRouter = Router();

couponRouter.use(protectedRoutes, allowedTo("admin"));

couponRouter
  .route("/")
  .get(getAllCoupons)
  .post(validate(addCouponValidation), addCoupon);
couponRouter
  .route("/:id")
  .get(getCoupon)
  .put(updateCoupon)
  .delete(deleteCoupon);

export default couponRouter;
