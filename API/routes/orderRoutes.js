const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

router.post('/', protect, orderController.createOrder);
router.delete('/:id', [protect], orderController.deleteOrder);
router.put('/:id', [protect], orderController.updateOrder);
router.get('/', protect, orderController.getAllOrders);
router.put('/:id', protect, orderController.updateOrder);
router.delete('/:id', [protect, admin], orderController.deleteOrder);

module.exports = router;
