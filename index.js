import "dotenv/config";
import express from "express";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import { globalError } from "./src/middleware/globalError.js";
import { AppError } from "./src/utils/appError.js";
import { bootstrap } from "./src/modules/bootstrap.routes.js";
import catchError from "./src/middleware/catchError.js";
import Stripe from "stripe";
import User from "./database/models/users.model.js";
import Cart from "./database/models/cart.model.js";
import Order from "./database/models/order.model.js";
import Product from "./database/models/product.model.js";
const stripeClient = new Stripe(process.env.STRIPE_KEY);

const app = express();
const port = process.env.PORT || 3000;

app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  catchError(async (req, res) => {
    const signature = req.headers["stripe-signature"];
    let event = stripeClient.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SINGING,
    );

    let checkout;
    if (event.type === "checkout.session.completed") {
      checkout = event.data.object;
      let user = await User.findOne({ email: checkout.customer_email });
      let cart = await Cart.findById(checkout.client_reference_id);
      if (!cart) return next(new AppError("cart not found", 404));

      let order = new Order({
        user: user._id,
        orderItems: cart.cartItems,
        shippingAddress: checkout.metadata,
        totalOrderPrice: checkout.amount_total / 100,
        paymentType: "card",
        isPaid: true,
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
    }
    res.json({ message: "success", checkout });
  }),
);

app.use(cors());
app.set("query parser", "extended");
app.use(express.json());
app.use("/uploads", express.static("uploads"));

await dbConnection();

bootstrap(app);
app.use((req, res, next) => {
  next(new AppError(`Route not Found ${req.originalUrl}`, 404));
});
app.use(globalError);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
