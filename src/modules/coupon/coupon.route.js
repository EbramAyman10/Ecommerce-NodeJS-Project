import { Router } from "express";
import {
  addCoupon,
  getAllCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
} from "./coupon.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const couponRouter = Router();

couponRouter.use(protectedRoutes, allowedTo("admin"));

couponRouter.route("/").get(getAllCoupons).post(addCoupon);
couponRouter
  .route("/:id")
  .get(getCoupon)
  .put(updateCoupon)
  .delete(deleteCoupon);

export default couponRouter;
