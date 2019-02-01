var express = require('express');
var couponRepo = require('../repo/coupon');

var router = express.Router();

router.get('/:code', (request, response) => {
  const couponCode = request.params.code;

  const foundCoupon = couponRepo.findByCode(couponCode);

  if (!foundCoupon) {
    return response.status(404).json({
      message: 'Coupon code was not found.',
    });
  }

  response.json({
    coupon: foundCoupon,
  });
});

module.exports = router;
