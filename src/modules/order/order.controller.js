import Cart from "../../../database/models/cart.model.js";
import Order from "../../../database/models/order.model.js";
import User from "../../../database/models/users.model.js";
import catchError from "../../middleware/catchError.js";
import { createOrderServer } from "../../service/orderService.js";
import { AppError } from "../../utils/appError.js";

import Stripe from "stripe";
const stripeClient = new Stripe(process.env.STRIPE_KEY);

const createCashOrder = catchError(async (req, res, next) => {
  let order = await createOrderServer(
    req.params.id,
    req.user._id,
    req.body.shippingAddress,
  );
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

const createCardOrder = catchError(async (req, res, next) => {
  const signature = req.headers["stripe-signature"];
  let event = stripeClient.webhooks.constructEvent(
    req.body,
    signature,
    process.env.STRIPE_WEBHOOK_SIGNING,
  );

  let checkout;
  if (event.type === "checkout.session.completed") {
    checkout = event.data.object;
    let user = await User.findOne({ email: checkout.customer_email });
    if (!user) return next(new AppError("user not found", 404));

    await createOrderServer(
      checkout.client_reference_id,
      user._id,
      checkout.metadata,
      "card",
      true,
    );
  }
  res.json({ message: "success", checkout });
});

export {
  createCardOrder,
  createCashOrder,
  createCheckoutSession,
  getAllOrders,
  getUserOrders,
};
