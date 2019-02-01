const cart = require('./cart');

class Checkout {
  constructor ({ cart, shipping }) {
    this.cart = cart;
    this.shipping = shipping;
  }

  getTotal () {
    return cart.total(this.cart) + this.shipping.cost;
  }
}

module.exports = Checkout;
