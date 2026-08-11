import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
    },
    expireDate: Date,
    discount: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Coupon = mongoose.model("Coupon", schema);

export default Coupon;
