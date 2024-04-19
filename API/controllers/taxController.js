// Import the Tax Model from the models folder
const Tax = require('../models/tax');
const asyncHandler = require('express-async-handler');

// POST: Create a Tax
const createTax = asyncHandler(async (req, res) => {
  const { state_name, rate, previous_rate } = req.body;

  try {
    const tax = await Tax.create({
      state_name,
      rate,
      previous_rate,
    });

    res.status(201).json(tax);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET: Retrieve all Taxes
const getAllTaxes = asyncHandler(async (req, res) => {
  try {
    const taxes = await Tax.findAll();

    res.json(taxes);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET: Retrieve Tax by ID
const getTaxById = asyncHandler(async (req, res) => {
  const taxId = req.params.id;

  try {
    const tax = await Tax.findByPk(taxId);

    if (!tax) {
      return res.status(404).json({ error: 'Tax not found!' });
    }

    res.json(tax);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT: Update a Tax
const updateTax = asyncHandler(async (req, res) => {
  const taxId = req.params.id;
  const { state_name, rate, previous_rate } = req.body;

  try {
    const tax = await Tax.findByPk(taxId);

    if (!tax) {
      return res.status(404).json({ error: 'Tax not found!' });
    }

    tax.state_name = state_name;
    tax.rate = rate;
    tax.previous_rate = previous_rate;

    await tax.save();
    res.json(tax);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE: Delete a Tax
const deleteTax = asyncHandler(async (req, res) => {
  const taxId = req.params.id;

  try {
    const tax = await Tax.findByPk(taxId);

    if (!tax) {
      return res.status(404).json({ error: 'Tax not found!' });
    }

    await tax.destroy();
    res
      .status(204)
      .json({ message: 'Tax successfully deleted', tax: tax });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = {
  getAllTaxes,
  getTaxById,
  createTax,
  updateTax,
  deleteTax,
};
