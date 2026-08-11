import Cart from "../../../database/models/cart.model.js";
import Order from "../../../database/models/order.model.js";
import Product from "../../../database/models/product.model.js";
import catchError from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";

import Stripe from "stripe";
const stripeClient = new Stripe(process.env.STRIPE_KEY);

const createCashOrder = catchError(async (req, res, next) => {
  let cart = await Cart.findById(req.params.id);
  if (!cart) return next(new AppError("cart not found", 404));

  let totalOrderPrice = cart.totalCartPriceAfterDiscound || cart.totalCartPrice;

  let order = new Order({
    user: req.user._id,
    orderItems: cart.cartItems,
    shippingAddress: req.body.shippingAddress,
    totalOrderPrice,
  });
  await order.save();

  let options = cart.cartItems.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod.product },
        update: { $inc: { sold: prod.quantity, stock: -prod.quantity } },
      },
    };
  });

  await Product.bulkWrite(options);

  await Cart.findByIdAndDelete(cart._id);
  res.json({ message: "Success", order });
});

const getUserOrders = catchError(async (req, res, next) => {
  let orders = await Order.find({ user: req.user._id }).populate(
    "orderItems.product",
  );
  res.json({ message: "Success", orders });
});
const getAllOrders = catchError(async (req, res, next) => {
  let orders = await Order.find().populate("orderItems.product");
  res.json({ message: "Success", orders });
});

const createCheckoutSession = catchError(async (req, res, next) => {
  let cart = await Cart.findById(req.params.id);
  if (!cart) return next(new AppError("cart not found", 404));

  let totalOrderPrice = cart.totalCartPriceAfterDiscound || cart.totalCartPrice;

  let session = await stripeClient.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          unit_amount: totalOrderPrice * 100,
          product_data: {
            name: req.user.name,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://127.0.0.1:3000/api/orders",
    cancel_url: "http://127.0.0.1:3000/api/cart",
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    metadata: req.body.shippingAddress,
  });
  res.json({ message: "Success", session });
});

export { createCashOrder, getUserOrders, getAllOrders, createCheckoutSession };
