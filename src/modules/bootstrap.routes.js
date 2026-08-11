import addressRouter from "./address/address.route.js";
import authRouter from "./auth/auth.route.js";
import brandRouter from "./brands/brand.route.js";
import cartRouter from "./cart/cart.route.js";
import categoryRouter from "./category/category.route.js";
import couponRouter from "./coupon/coupon.route.js";
import orderRouter from "./order/order.route.js";
import productRouter from "./products/product.route.js";
import reviewRouter from "./review/review.route.js";
import subCategoryRouter from "./subCategory/subCategory.route.js";
import userRouter from "./user/user.route.js";
import wishlistRouter from "./wishlist/wishlist.route.js";

export const bootstrap = (app) => {
  app.use("/api/categories", categoryRouter);
  app.use("/api/subCategories", subCategoryRouter);
  app.use("/api/brands", brandRouter);
  app.use("/api/products", productRouter);
  app.use("/api/users", userRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/reviews", reviewRouter);
  app.use("/api/wishlists", wishlistRouter);
  app.use("/api/addresses", addressRouter);
  app.use("/api/coupons", couponRouter);
  app.use("/api/cart", cartRouter);
  app.use("/api/orders", orderRouter);
};
