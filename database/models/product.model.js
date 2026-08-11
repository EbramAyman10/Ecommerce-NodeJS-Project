import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
      unique: true,
      minLength: [2, "too short category name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
      min: 200,
      max: 2000,
    },
    imageCover: String,
    images: [String],
    price: {
      type: Number,
      min: 0,
    },

    priceAfterDiscount: {
      type: Number,
      min: 0,
    },

    sold: Number,
    stock: {
      type: Number,
      min: 0,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
    },
    subCategory: {
      type: mongoose.Types.ObjectId,
      ref: "SubCategory",
    },
    rateAvg: {
      type: Number,
      min: 0,
      max: 5,
    },
    rateCount: Number,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
  },
);
schema.post("init", function (docs) {
  if (docs.imageCover)
    docs.imageCover = process.env.BASE_URL + "products/" + docs.imageCover;
  if (docs.images)
    docs.images = docs.images.map(
      (val) => process.env.BASE_URL + "products/" + val,
    );
});

schema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
});

schema.pre("findOne", function () {
  this.populate("reviews");
});

const Product = mongoose.model("Product", schema);

export default Product;
