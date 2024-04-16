// Import the Coupon Model from the models folder
const Coupon = require('../models/coupon');
const asyncHandler = require('express-async-handler');

// POST: Create a Coupon
const createCoupon = asyncHandler(async (req, res) => {
  const { code, discount, expiration_date } = req.body;

  try {
    const coupon = await Coupon.create({
      code,
      discount,
      expiration_date,
    });

    res.status(201).json(coupon);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET: Retrieve all Coupons
const getAllCoupons = asyncHandler(async (req, res) => {
  try {
    const coupons = await Coupon.findAll();

    res.json(coupons);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET: Retrieve Coupon by ID
const getCouponById = asyncHandler(async (req, res) => {
  const couponId = req.params.id;

  try {
    const coupon = await Coupon.findByPk(couponId);

    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found!' });
    }

    res.json(coupon);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT: Update a Coupon
const updateCoupon = asyncHandler(async (req, res) => {
  const couponId = req.params.id;
  const { code, discount, expiration_date } = req.body;

  try {
    const coupon = await Coupon.findByPk(couponId);

    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found!' });
    }

    coupon.code = code;
    coupon.discount = discount;
    coupon.expiration_date = expiration_date;

    await coupon.save();
    res.json(coupon);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE: Delete a Coupon
const deleteCoupon = asyncHandler(async (req, res) => {
  const couponId = req.params.id;

  try {
    const coupon = await Coupon.findByPk(couponId);

    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found!' });
    }

    await coupon.destroy();
    res
      .status(204)
      .json({ message: 'Coupon successfully deleted', coupon: coupon });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = {
  getAllCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon,
};
