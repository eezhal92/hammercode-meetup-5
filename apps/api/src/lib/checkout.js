const cart = require('./cart');

class Checkout {
  constructor ({ cart, shipping, coupon }) {
    this.cart = cart;
    this.shipping = shipping;

    if (coupon) {
      var validTypes = ['percent', 'nominal']

      if (!validTypes.includes(coupon.type)) {
        throw new Error(`Valid type should be either one of ${validTypes.join(',')}`)
      }

      var isValidAmount = typeof coupon.amount === 'number'

      if (!isValidAmount) {
        throw new Error(`discount.amount should be type of number`)
      }
    }

    // other validation logic that you want...

    this.coupon = coupon;
  }

  getTotal () {
    return this.applyCoupon(cart.total(this.cart)) + this.shipping.cost;
  }

  applyCoupon (total) {
    if (!this.coupon) return total;

    if (this.coupon.type === 'percent') {
      return this.discountByPercent(total, this.coupon.amount)
    }

    return this.discountByNominal(total, this.coupon.amount)
  }

  discountByPercent (total, amount) {
    return total - (total * amount / 100)
  }

  discountByNominal (total, amount) {
    return total - amount
  }
}

module.exports = Checkout;
