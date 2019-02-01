const Shipping = require('../shipping');

describe('Shipping', () => {
  test('create shipping should return correct info', () => {
    const shippingA = new Shipping({
      name: 'Alex',
      address: 'Jl. kenangan',
      destination: 'palu',
      selectedCourier: 'pos',
    });

    expect(shippingA.name).toBe('Alex');
    expect(shippingA.address).toBe('Jl. kenangan');
    expect(shippingA.destination).toBe('palu');
    expect(shippingA.cost).toBe(10);

    const shippingB = new Shipping({
      name: 'Billy',
      address: 'Jl. jalan',
      destination: 'donggala',
      selectedCourier: 'jne',
    });

    expect(shippingB.name).toBe('Billy');
    expect(shippingB.address).toBe('Jl. jalan');
    expect(shippingB.destination).toBe('donggala');
    expect(shippingB.cost).toBe(25);
  });
});
