// Import the Billing and Shipping Address Models from the models folder
const BillingAddress = require('../models/billingAddress');
const ShippingAddress = require('../models/shippingAddress');
const asyncHandler = require('express-async-handler');

// Billing Address Functions

// POST: Create a Billing Address
const createBillingAddress = asyncHandler(async (req, res) => {
  const { address, address2, city, state, zip_code, phone_number } = req.body;

  try {
    const billingAddress = await BillingAddress.create({
      address,
      address2,
      city,
      state,
      zip_code,
      phone_number,
      user_id: req.user.id,
    });

    res.status(201).json(billingAddress);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET: Retrieve all Billing Addresses
const getAllBillingAddresses = asyncHandler(async (req, res) => {
  try {
    const billingAddresses = await BillingAddress.findAll();

    res.json(billingAddresses);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET: Retrieve a Billing Address by ID
const getBillingAddressById = asyncHandler(async (req, res) => {
  const billingAddressId = req.params.id;

  try {
    const billingAddress = await BillingAddress.findByPk(billingAddressId);

    if (!billingAddress) {
      return res.status(404).json({ error: 'Billing Address not found!' });
    }

    res.json(billingAddress);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT: Update a Billing Address
const updateBillingAddress = asyncHandler(async (req, res) => {
  const billingAddressId = req.params.id;
  const { address, address2, city, state, zip_code, phone_number } = req.body;

  try {
    const billingAddress = await BillingAddress.findByPk(billingAddressId);

    if (!billingAddress) {
      return res.status(404).json({ error: 'Billing Address not found!' });
    }

    billingAddress.address = address;
    billingAddress.address2 = address2;
    billingAddress.city = city;
    billingAddress.state = state;
    billingAddress.zip_code = zip_code;
    billingAddress.phone_number = phone_number;

    await billingAddress.save();
    res.json(billingAddress);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE: Delete a Billing Address
const deleteBillingAddress = asyncHandler(async (req, res) => {
  const billingAddressId = req.params.id;

  try {
    const billingAddress = await BillingAddress.findByPk(billingAddressId);

    if (!billingAddress) {
      return res.status(400).json({ error: 'Billing Address not found!' });
    }

    await billingAddress.destroy();
    res.status(204).json(billingAddress);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Shipping Address Functions

// POST: Create a Shipping Address
const createShippingAddress = asyncHandler(async (req, res) => {
  const { address, address2, city, state, zip_code, phone_number, shipping_type, shipping_cost } = req.body;

  try {
    const shippingAddress = await ShippingAddress.create({
      address,
      address2,
      city,
      state,
      zip_code,
      phone_number,
      shipping_type,
      shipping_cost,
      user_id: req.user.id,
    });

    res.status(201).json(shippingAddress);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET: Retrieve all Shipping Addresses
const getAllShippingAddresses = asyncHandler(async (req, res) => {
  try {
    const shippingAddresses = await ShippingAddress.findAll();

    res.json(shippingAddresses);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET: Retrieve a Shipping Address by ID
const getShippingAddressById = asyncHandler(async (req, res) => {
  const shippingAddressId = req.params.id;

  try {
    const shippingAddress = await ShippingAddress.findByPk(shippingAddressId);

    if (!shippingAddress) {
      return res.status(404).json({ error: 'Shipping Address not found!' });
    }

    res.json(shippingAddress);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT: Update a Shipping Address
const updateShippingAddress = asyncHandler(async (req, res) => {
  const shippingAddressId = req.params.id;
  const { address, address2, city, state, zip_code, phone_number, shipping_type, shipping_cost } = req.body;

  try {
    const shippingAddress = await ShippingAddress.findByPk(shippingAddressId);

    if (!shippingAddress) {
      return res.status(404).json({ error: 'Shipping Address not found!' });
    }

    shippingAddress.address = address;
    shippingAddress.address2 = address2;
    shippingAddress.city = city;
    shippingAddress.state = state;
    shippingAddress.zip_code = zip_code;
    shippingAddress.phone_number = phone_number;
    shippingAddress.shipping_type = shipping_type;
    shippingAddress.shipping_cost = shipping_cost;

    await shippingAddress.save();
    res.json(shippingAddress);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE: Delete a Shipping Address
const deleteShippingAddress = asyncHandler(async (req, res) => {
  const shippingAddressId = req.params.id;

  try {
    const shippingAddress = await ShippingAddress.findByPk(shippingAddressId);

    if (!shippingAddress) {
      return res.status(400).json({ error: 'Shipping Address not found!' });
    }

    await shippingAddress.destroy();
    res.status(204).json(shippingAddress);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = {
  // Billing Address Functions
  createBillingAddress,
  getAllBillingAddresses,
  getBillingAddressById,
  updateBillingAddress,
  deleteBillingAddress,
  // Shipping Address Functions
  createShippingAddress,
  getAllShippingAddresses,
  getShippingAddressById,
  updateShippingAddress,
  deleteShippingAddress,
};
