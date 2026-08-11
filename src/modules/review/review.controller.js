import catchError from "../../middleware/catchError.js";
import slugify from "slugify";
import { AppError } from "../../utils/appError.js";
import Review from "../../../database/models/review.model.js";
import { deleteOne, getAll, getOne } from "../../handlers/handlers.js";

const addReview = catchError(async (req, res, next) => {
  let user = await Review.findOne({
    user: req.user._id,
    product: req.body.product,
  });
  if (user) return next(new AppError("you only review once", 409));
  req.body.user = req.user._id;

  let review = new Review(req.body);
  await review.save();
  res.status(201).json({ message: "Success", review });
});

const getAllReviews = getAll(Review);

const getReview = getOne(Review);

const updateReview = catchError(async (req, res, next) => {
  let review = await Review.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    {
      new: true,
    },
  );
  if (!review)
    return next(
      new AppError("review not found or you didn't create the review", 404),
    );
  res.json({ message: "Success", review });
});
const deleteReview = catchError(async (req, res, next) => {
  let document = undefined;

  if (req.user.role === "admin") {
    document = await Review.findByIdAndDelete(req.params.id);
  } else {
    document = await Review.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
  }

  if (!document)
    return next(
      new AppError("review not found or you didn't create the review", 404),
    );
  res.json({ message: "Success", document });
});

export { addReview, getAllReviews, getReview, updateReview, deleteReview };
