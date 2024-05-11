const Order = require('../models/order');
const OrderDetails = require('../models/orderDetails');
const Coupon = require('../models/coupon');
const Game = require('../models/game');
const ShippingAddress = require('../models/shippingAddress');
const Tax = require('../models/tax');
const User = require('../models/user');
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

    for (const game of games) {
      await Game.decrement('quantity', {
        by: game.quantity,
        where: { id: game.id },
      });
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
 * @desc Retrieve all orders a user has made, admins get access to all orders that anyone has made
 * @route GET /api/orders
 * @access Private
 */

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const user_id = req.user.id;
    const user = await User.findOne({ where: { id: user_id } });
    let orders;
    if (user.role === 'admin') {
      orders = await Order.findAll();
    } else {
      orders = await Order.findAll({
        where: { user_id },
      });
    }

    // Use Promise.all to wait for all asynchronous operations to complete
    const updatedOrders = await Promise.all(
      orders.map(async (order) => {
        const shippingAddress = await ShippingAddress.findOne({
          where: { id: order.shipping_address_id },
        });
        return {
          id: order.id,
          user: {
            first_name: user.full_name.split(' ')[0],
            last_name:
              user.full_name.split(' ')[user.full_name.split(' ').length - 1],
            email: user.email,
          },
          status: order.status,
          subtotal: order.subtotal,
          discount: order.discount,
          coupon_id: order.coupon_id,
          tax_id: order.tax_id,
          grand_total: order.grand_total,
          shipping_address: {
            address: shippingAddress.address,
            address2: shippingAddress.address2,
            state: shippingAddress.state,
            city: shippingAddress.city,
            zip: shippingAddress.zip_code,
          },
          billing_address_id: order.billing_address_id,
          created_at: order.created_at,
          updated_at: order.updated_at,
        };
      })
    );
    res.json(updatedOrders);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @desc Update an existing order
 * @route PUT /api/orders/:id
 * @access Private
 */

const updateOrder = asyncHandler(async (req, res) => {
  try {
    const user_id = req.user.id;
    const order_id = req.params.id;
    const {
      orderItems,
      shipping_address_id,
      billing_address_id,
      discount,
      coupon_code,
    } = req.body;
    const order = await Order.findOne({ where: { id: order_id } });

    let coupon;
    if (coupon_code) {
      coupon = await Coupon.findOne({ where: { code: coupon_code } });
    }

    let games = await Game.findAll({
      where: { id: orderItems.map((item) => item.game_id) },
    });
    games = games.map((game) => {
      const orderItem = orderItems.find((item) => item.game_id === game.id);
      return {
        id: game.id,
        price: game.price,
        quantity: orderItem.quantity,
      };
    });

    const shippingAddress = await ShippingAddress.findByPk(shipping_address_id);
    const tax = await Tax.findOne({
      where: { state_name: shippingAddress.state },
    });

    const { subtotal, grandTotal, totalDiscount } = priceCalculation(
      games,
      coupon,
      discount,
      tax
    );

    console.log(order);
    order.subtotal = subtotal;
    order.discount = totalDiscount;
    order.coupon_id = coupon ? coupon.id : null;
    order.tax_id = tax.id;
    order.grand_total = grandTotal;
    order.shipping_address_id = shipping_address_id;
    order.billing_address_id = billing_address_id;

    await OrderDetails.destroy({ where: { order_id } });

    for (const game of games) {
      await OrderDetails.create({
        order_id: order.id,
        game_id: game.id,
        quantity: game.quantity,
        price: game.price,
      });
    }

    // Save the updated order
    await order.save();

    res
      .status(200)
      .json({ message: 'Your order has been successfully updated', order });
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

module.exports = { createOrder, getAllOrders, updateOrder, deleteOrder };
