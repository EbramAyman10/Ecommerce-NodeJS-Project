import mongoose from "mongoose";
import bcrypt from "bcrypt";
const schema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    confrimEmail: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: Date,
    wishlist: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
    addresses: [
      {
        city: String,
        phone: String,
        street: String,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

schema.pre("save", function () {
  if (this.isModified("password"))
    this.password = bcrypt.hashSync(this.password, 8);
});
schema.pre("findOneAndUpdate", function () {
  if (this._update.password)
    this._update.password = bcrypt.hashSync(this._update.password, 8);
});

const User = mongoose.model("User", schema);

export default User;
