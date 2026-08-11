import User from "../../../database/models/users.model.js";
import catchError from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";

const addAddress = catchError(async (req, res, next) => {
  let address = await User.findByIdAndUpdate(
    req.user._id,
    { $push: { addresses: req.body } },
    {
      new: true,
    },
  );
  if (!address) return next(new AppError("address not found", 404));
  res.json({ message: "Success", address: address.addresses });
});

const removeAddress = catchError(async (req, res, next) => {
  let address = await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { addresses: { _id: req.params.id } } },
    {
      new: true,
    },
  );
  if (!address) return next(new AppError("address not found", 404));
  res.json({ message: "Success", address: address.addresses });
});

const getLoggedUserAddresses = catchError(async (req, res, next) => {
  let address = await User.findById(req.user._id);
  if (!address) return next(new AppError("address not found", 404));
  res.json({ message: "Success", address: address.addresses });
});

export { addAddress, removeAddress, getLoggedUserAddresses };
