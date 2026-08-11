import User from "../../../database/models/users.model.js";
import catchError from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";

const addToWishlist = catchError(async (req, res, next) => {
  let wishlist = await User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { wishlist: req.body.product } },
    {
      new: true,
    },
  );
  if (!wishlist) return next(new AppError("wishlist not found", 404));
  res.json({ message: "Success", wishlist: wishlist.wishlist });
});

const removeFromWishlist = catchError(async (req, res, next) => {
  let wishlist = await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { wishlist: req.body.product } },
    {
      new: true,
    },
  );
  if (!wishlist) return next(new AppError("wishlist not found", 404));
  res.json({ message: "Success", wishlist: wishlist.wishlist });
});

const getLoggedUserWishlist = catchError(async (req, res, next) => {
  let wishlist = await User.findById(req.user._id).populate("wishlist");
  if (!wishlist) return next(new AppError("wishlist not found", 404));
  res.json({ message: "Success", wishlist: wishlist.wishlist });
});

export { addToWishlist, removeFromWishlist, getLoggedUserWishlist };
