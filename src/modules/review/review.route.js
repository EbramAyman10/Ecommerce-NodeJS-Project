import { Router } from "express";
import {
  addReview,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
} from "./review.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const reviewRouter = Router();

reviewRouter
  .route("/")
  .get(getAllReviews)
  .post(protectedRoutes, allowedTo("user"), addReview);
reviewRouter
  .route("/:id")
  .get(getReview)
  .put(protectedRoutes, allowedTo("user"), updateReview)
  .delete(protectedRoutes, allowedTo("user", "admin"), deleteReview);

export default reviewRouter;
