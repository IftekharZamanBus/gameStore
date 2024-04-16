const express = require('express');
const router = express.Router();

const couponController = require('../controllers/couponController');

const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', [protect, admin], couponController.createCoupon);
router.get('/', couponController.getAllCoupons);
router.get('/:id', couponController.getCouponById);
router.put('/:id', [protect, admin], couponController.updateCoupon);
router.delete('/:id', [protect, admin], couponController.deleteCoupon);

module.exports = router;
