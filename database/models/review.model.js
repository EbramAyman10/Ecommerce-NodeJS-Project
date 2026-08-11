import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    comment: String,
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    rate: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

schema.pre(/^find/, function () {
  this.populate("user", "name -_id");
});

const Review = mongoose.model("Review", schema);

export default Review;
