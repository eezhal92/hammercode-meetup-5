var express = require('express');
var product = require('./product');
var cart = require('./cart');
var coupon = require('./coupon');

var router = express.Router();

router.use('/products', product);
router.use('/carts', cart);
router.use('/coupons', coupon);

module.exports = router;
