const cart = require('../cart');
const Checkout = require('../checkout');
const Shipping = require('../shipping');

describe('Shipping', () => {
  test('`getTotal` should return correct total', () => {
    const c = cart.create([
      { productId: 'product-1', name: 'Awesome Book', price: 20, qty: 3 },
      { productId: 'product-5', name: 'Good Book', price: 40,  qty: 2 },
    ]);

    const shipping = new Shipping({
      name: 'John',
      address: 'Jl. Sorosutan',
      destination: 'palu',
      selectedCourier: 'pos',
    });

    const checkout = new Checkout({
      cart: c,
      shipping,
    });

    expect(checkout.getTotal()).toBe(140 + 10);
  });
});
