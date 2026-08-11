import { Router } from "express";

import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import {
  addToCart,
  applyCoupon,
  clearUserCart,
  getLoggedUserCart,
  removeFromCart,
  updateQuantity,
} from "./cart.controller.js";

const cartRouter = Router();

cartRouter.use(protectedRoutes, allowedTo("user"));

cartRouter
  .route("/")
  .post(addToCart)
  .get(getLoggedUserCart)
  .delete(clearUserCart);
cartRouter.route("/:id").put(updateQuantity).delete(removeFromCart);
cartRouter.route("/apply-coupon").post(applyCoupon);
export default cartRouter;
