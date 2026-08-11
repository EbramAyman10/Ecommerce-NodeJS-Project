import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      unique: true,
      minLength: [2, "too short category name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    image: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

schema.post("init", function (docs) {
  if (docs.image)
    docs.image = process.env.BASE_URL + "categories/" + docs.image;
});

const Category = mongoose.model("Category", schema);

export default Category;
