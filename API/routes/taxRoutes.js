const express = require('express');
const router = express.Router();

const taxController = require('../controllers/taxController');

const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', [protect, admin], taxController.createTax);
router.get('/', taxController.getAllTaxes);
router.get('/:id', taxController.getTaxById);
router.put('/:id', [protect, admin], taxController.updateTax);
router.delete('/:id', [protect, admin], taxController.deleteTax);

module.exports = router;
