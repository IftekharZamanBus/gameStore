// Import the Billing Address Model from the models folder
const BillingAddress = require('../models/billingAddress');
const asyncHandler = require('express-async-handler');

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

module.exports = {
  createBillingAddress,
  getAllBillingAddresses,
  getBillingAddressById,
  updateBillingAddress,
  deleteBillingAddress,
};
