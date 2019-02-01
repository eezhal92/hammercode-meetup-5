var COUPONS = [
  { code: 'HAMMERCODE10', amount: 10, type: 'percent' },
  { code: 'JS20', amount: 20, type: 'nominal' },
]

function findByCode (couponCode) {
  return COUPONS.find(function (coupon) {
    return coupon.code === couponCode;
  }) || null;
}

module.exports = {
  findByCode: findByCode,
};
