import Cart from "../../database/models/cart.model.js";
import Order from "../../database/models/order.model.js";
import Product from "../../database/models/product.model.js";
import { AppError } from "../utils/appError.js";

export const createOrderServer = async function (
  cartId,
  userId,
  shippingAddress,
  paymentType = "cash",
  isPaid = false,
) {
  let cart = await Cart.findById(cartId);
  if (!cart) throw new AppError("cart not found", 404);

  let totalOrderPrice = cart.totalCartPriceAfterDiscound || cart.totalCartPrice;

  let order = new Order({
    user: userId,
    orderItems: cart.cartItems,
    shippingAddress,
    totalOrderPrice,
    paymentType,
    isPaid,
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
  return order;
};
