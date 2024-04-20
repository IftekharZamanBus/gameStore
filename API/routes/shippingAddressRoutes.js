const express = require('express');
const router = express.Router();

const addressController = require('../controllers/addressController');

const { protect } = require('../middleware/authMiddleware');

// Routes for Shipping Addresses

router.post('/', [protect], addressController.createShippingAddress);
router.get('/', [protect], addressController.getAllShippingAddresses);
router.get('/:id', [protect], addressController.getShippingAddressById);
router.put('/:id', [protect], addressController.updateShippingAddress);
router.delete('/:id', [protect], addressController.deleteShippingAddress);

module.exports = router;
