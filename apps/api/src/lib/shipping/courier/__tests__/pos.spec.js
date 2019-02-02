const PosCourier = require('../pos');

describe('PosCourier', () => {
  test('calculate should return correct cost', () => {
    const pos = new PosCourier('palu');

    expect(pos.calculate()).toBe(10);
    expect(new PosCourier('donggala').calculate()).toBe(20);
    expect(new PosCourier('manado').calculate()).toBe(50);
  });
});
