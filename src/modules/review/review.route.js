import { Router } from "express";
import {
  addReview,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
} from "./review.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { addReviewValidation } from "./review.validation.js";

const reviewRouter = Router();

reviewRouter
  .route("/")
  .get(getAllReviews)
  .post(
    protectedRoutes,
    allowedTo("user"),
    validate(addReviewValidation),
    addReview,
  );
reviewRouter
  .route("/:id")
  .get(getReview)
  .put(protectedRoutes, allowedTo("user"), updateReview)
  .delete(protectedRoutes, allowedTo("user", "admin"), deleteReview);

export default reviewRouter;
