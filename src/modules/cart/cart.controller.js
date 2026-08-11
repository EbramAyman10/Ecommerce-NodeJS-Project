import Cart from "../../../database/models/cart.model.js";
import Coupon from "../../../database/models/coupon.model.js";
import Product from "../../../database/models/product.model.js";
import catchError from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";

function calcTotalPrice(cart) {
  cart.totalCartPrice = cart.cartItems.reduce(
    (prev, item) => (prev += item.quantity * item.price),
    0,
  );

  if (cart.discount) {
    cart.totalCartPriceAfterDiscound = (
      cart.totalCartPrice -
      (cart.totalCartPrice * cart.discount) / 100
    ).toFixed(2);
  }
}

const addToCart = catchError(async (req, res, next) => {
  let isCartExist = await Cart.findOne({ user: req.user._id });

  let product = await Product.findById(req.body.product);
  if (!product) return next(new AppError("product isn't exist", 404));

  req.body.price = product.price;

  if (req.body.quantity > product.stock)
    return next(new AppError("sold out", 404));

  if (!isCartExist) {
    let cart = new Cart({
      user: req.user._id,
      cartItems: [req.body],
    });
    calcTotalPrice(cart);
    await cart.save();
    res.json({ message: "Success", cart });
  } else {
    let item = isCartExist.cartItems.find(
      (item) => item.product == req.body.product,
    );
    if (item) {
      item.quantity += req.body.quantity || 1;
      if (item.quantity > product.stock)
        return next(new AppError("sold out", 404));
    }
    if (!item) isCartExist.cartItems.push(req.body);
    calcTotalPrice(isCartExist);
    await isCartExist.save();
    res.json({ message: "Success", cart: isCartExist });
  }
});

const updateQuantity = catchError(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user._id });

  let item = cart.cartItems.find((item) => item.product == req.params.id);
  if (!item) return next(new AppError("product not found", 404));

  let product = await Product.findById(req.params.id);
  if (!product) return next(new AppError("product isn't exist", 404));

  if (req.body.quantity > product.stock)
    return next(new AppError("sold out", 404));

  item.quantity = req.body.quantity;
  calcTotalPrice(cart);
  await cart.save();
  res.json({ message: "success", cart });
});

const removeFromCart = catchError(async (req, res, next) => {
  let cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItems: { _id: req.params.id } } },
    {
      new: true,
    },
  );
  if (!cart) return next(new AppError("cart not found", 404));
  calcTotalPrice(cart);
  await cart.save();
  res.json({ message: "Success", cart });
});
const getLoggedUserCart = catchError(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return next(new AppError("cart not found", 404));
  res.json({ message: "Success", cart });
});
const clearUserCart = catchError(async (req, res, next) => {
  let cart = await Cart.findOneAndDelete({ user: req.user._id });
  if (!cart) return next(new AppError("cart not found", 404));
  res.json({ message: "Success", cart });
});

const applyCoupon = catchError(async (req, res, next) => {
  let coupon = await Coupon.findOne({
    code: req.body.code,
    expireDate: { $gte: Date.now() },
  });
  if (!coupon) return next(new AppError("coupon invalid", 404));

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return next(new AppError("cart not found", 404));

  cart.discount = coupon.discount;
  calcTotalPrice(cart);
  await cart.save();
  res.json({ message: "success", cart });
});

export {
  addToCart,
  updateQuantity,
  removeFromCart,
  getLoggedUserCart,
  clearUserCart,
  applyCoupon,
};
