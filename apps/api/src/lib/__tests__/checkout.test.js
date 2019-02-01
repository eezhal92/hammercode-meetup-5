const cart = require('../cart');
const Checkout = require('../checkout');
const Shipping = require('../shipping');

describe('Shipping', () => {
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

  test('`getTotal` should return correct total', () => {
    const checkout = new Checkout({
      cart: c,
      shipping,
    });

    expect(checkout.getTotal()).toBe(140 + 10);
  });

  it('should throw error when creating checkout with invalid coupon', () => {
    expect(() => {
      new Checkout({
        cart: c,
        shipping,
        coupon: { amount: null, type: 'percent' }
      });
    }).toThrow()

    expect(() => {
      new Checkout({
        cart: c,
        shipping,
        coupon: { amount: '20', type: 'percent' }
      });
    }).toThrow()

    expect(() => {
      const checkout = new Checkout({
        cart: c,
        shipping,
        coupon: { amount: 20, type: 'invalid-type' },
      });
    }).toThrow()
  });

  test('`getTotal` with coupon should return correct total', () => {
    const couponA = {
      type: 'percent',
      amount: 15,
    }

    const checkoutA = new Checkout({
      cart: c,
      shipping,
      coupon: couponA,
    });

    expect(checkoutA.getTotal()).toBe((140 - (140 * (couponA.amount / 100))) + 10);

    const couponB = {
      type: 'nominal',
      amount: 15,
    }

    const checkoutB = new Checkout({
      cart: c,
      shipping,
      coupon: couponB,
    });

    expect(checkoutB.getTotal()).toBe((140 - (couponB.amount)) + 10);
  });
});
