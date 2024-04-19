const express = require('express');
const router = express.Router();

const addressController = require('../controllers/addressController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addressController.createBillingAddress);
router.get('/', protect, addressController.getAllBillingAddresses);
router.get('/:id', protect, addressController.getBillingAddressById);
router.put('/:id', protect, addressController.updateBillingAddress);
router.delete('/:id', protect, addressController.deleteBillingAddress);

module.exports = router;
