const Order = require('../models/order');
const OrderDetails = require('../models/orderDetails');
const Coupon = require('../models/coupon');
const Game = require('../models/game');
const ShippingAddress = require('../models/shippingAddress');
const Tax = require('../models/tax');
const asyncHandler = require('express-async-handler');
const { priceCalculation } = require('../utils/priceCalculation');

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
    throw new Error('No order items found');
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
    res.status(201).json({
      message: `Successfully placed the order. Confirmation number: ${order.id}`,
      order,
    });
  } catch (error) {
    // Handle errors by logging them and sending a 500 Internal Server Error response
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @desc   Update an existing order
 * @route  PUT /api/orders/:id
 * @access Private
 */

async function recalculateOrderPrice(orderId, shippingAddressId) {
  try {
    // Retrieve the order from the database
    const order = await Order.findByPk(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    // Retrieve order details associated with the order
    const orderDetails = await OrderDetails.findAll({
      where: { order_id: orderId },
    });

    // Retrieve any applied discount or coupon
    const discount = order.discount;
    const couponId = order.coupon_id;

    let coupon = null;
    if (couponId) {
      coupon = await Coupon.findByPk(couponId);
    }

    // Retrieve shipping address and tax information
    const shippingAddress = await ShippingAddress.findByPk(shippingAddressId);
    const tax = await Tax.findOne({
      where: { state_name: shippingAddress.state },
    });

    // Calculate the subtotal, discount, and grand total using the priceCalculation function
    const { subtotal, grandTotal, totalDiscount } = priceCalculation(
      orderDetails,
      coupon,
      discount,
      tax
    );

    // Update the order with the recalculated prices, shipping address, and tax
    order.subtotal = subtotal;
    order.discount = totalDiscount;
    order.grand_total = grandTotal;
    order.tax_id = tax.id; // Assuming tax.id represents the tax associated with the order
    order.shipping_address_id = shippingAddressId;

    // Save the updated order to the database
    await order.save();

    return { subtotal, grandTotal, totalDiscount };
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error recalculating order price');
  }
}

const updateOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const { orderItems, discount, coupon_code, shipping_address_id } = req.body;

  try {
    // Retrieve the existing order from the database
    let order = await Order.findByPk(orderId);
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    // Update order details if necessary
    if (orderItems) {
      // Handle updating order items
      // For simplicity, you might delete existing order details and create new ones
      await OrderDetails.destroy({ where: { order_id: orderId } });

      // Create new order details based on the updated order items
      for (const item of orderItems) {
        await OrderDetails.create({
          order_id: orderId,
          game_id: item.game_id,
          quantity: item.quantity,
          price: item.price,
        });
      }
    }

    // Update discount and coupon if provided
    if (discount) {
      order.discount = discount;
    }

    // Recalculate order price
    await recalculateOrderPrice(orderId, shipping_address_id);

    // Save the updated order
    await order.save();

    res.status(200).json({ message: 'Order updated successfully', order });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/* @desc   Delete an order by ID
 * @route  DELETE /api/orders/:id
 * @access Private
 */

const deleteOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id;

  // Check if the order exists
  const order = await Order.findByPk(orderId);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Delete the order and associated order details
  await Order.destroy({ where: { id: orderId } });
  await OrderDetails.destroy({ where: { order_id: orderId } });

  res.status(200).json({ message: 'Order deleted successfully' });
});

module.exports = { createOrder, updateOrder, deleteOrder };
