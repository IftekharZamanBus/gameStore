const Order = require("../models/order");
const OrderDetails = require("../models/orderDetails");
const Coupon = require("../models/coupon");
const Game = require("../models/game");
const ShippingAddress = require("../models/shippingAddress");
const Tax = require("../models/tax");
const asyncHandler = require("express-async-handler");
const { priceCalculation } = require("../utils/priceCalculation");

/**
 * @desc   Create a new order
 * @route  POST /api/orders
 * @access Private
 */

const createOrder = asyncHandler(async (req, res) => {
  const user_id = req.user.id;
  // Extract relevant data from the request body
  // orderItems will be an array of objects containing game_id and quantity
  const {
    orderItems,
    shipping_address_id,
    billing_address_id,
    discount,
    coupon_code,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items found");
    return;
  }

  try {
    // Find the coupon id by its code
    let coupon = null;
    if (coupon_code)
      coupon = await Coupon.findOne({ where: { code: coupon_code } });

    // Get the ordered games from our database
    let games = await Game.findAll({
      where: { id: orderItems.map((item) => item.game_id) },
    });
    // Merge the quantity from the orderItems with the games
    games = games.map((game) => {
      const orderItem = orderItems.find((item) => item.game_id === game.id);
      return {
        id: game.id,
        price: game.price,
        quantity: orderItem.quantity,
      };
    });
    //Get tax rate from the database by using shipping address id and using the state value
    const shippingAddress = await ShippingAddress.findByPk(shipping_address_id);
    const tax = await Tax.findOne({
      where: { state_name: shippingAddress.state },
    });

    // Calculate the order subtotal, discount, and grand total
    const { subtotal, grandTotal, totalDiscount } = priceCalculation(
      games,
      coupon,
      discount,
      tax
    );

    // Create a new order in the database using Sequelize's create method
    const order = await Order.create({
      user_id,
      subtotal,
      discount: totalDiscount,
      coupon_id: coupon ? coupon.id : null,
      tax_id: tax.id,
      grand_total: grandTotal,
      shipping_address_id,
      billing_address_id,
    });

    // Create order details for each game in the order
    for (const game of games) {
      await OrderDetails.create({
        order_id: order.id,
        game_id: game.id,
        quantity: game.quantity,
        price: game.price,
      });
    }

    // Send the created order as a JSON response
    res.status(201).json({message: `Successfully placed the order. Confirmation number: ${order.id}`, order});
  } catch (error) {
    // Handle errors by logging them and sending a 500 Internal Server Error response
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { createOrder };
