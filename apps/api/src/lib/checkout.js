const cart = require('./cart');

class Checkout {
  constructor ({ cart, shipping, coupon }) {
    this.cart = cart;
    this.shipping = shipping;
    this.coupon = coupon;
  }

  getTotal () {
    return this.applyCoupon(cart.total(this.cart)) + this.shipping.cost;
  }

  applyCoupon (total) {
    if (!this.coupon) return total;

    var validTypes = ['percent', 'nominal']

    if (!validTypes.includes(this.coupon.type)) {
      throw new Error(`Valid type should be either one of ${validTypes.join(',')}`)
    }

    var isValidAmount = typeof this.coupon.amount === 'number'

    if (!isValidAmount) {
      throw new Error(`discount.amount should be type of number`)
    }

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
