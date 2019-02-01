const BaseCourier = require('../base');

describe('BaseCourier', () => {
  test('cannot be instantiated', () => {
    try {
      new BaseCourier();
    } catch (error) {
      expect(error.message).toBe('Cannot create BaseCourier instance. It should be extended by another class.');
    }
  });

  test('can be instantiated by another class', () => {
    class Foo extends BaseCourier {
      getCostMap () {
        return { palu: 11 };
      }
    }
    const foo = new Foo('palu');
    expect(foo instanceof BaseCourier).toBe(true);
  });

  test('child class should implement `getCostMap` method', () => {
    class Foo extends BaseCourier {}
    const foo = new Foo();

    try {
      foo.getCostMap();
    } catch (error) {
      expect(error.message).toBe('getCostMap is not implemented');
    }
  });

  test('child class cannot call `calculate` method if destination is not supported', () => {
    class Foo extends BaseCourier {
      getCostMap () {
        return { palu: 11 };
      }
    }
    const foo = new Foo('timika');

    try {
      foo.calculate();
    } catch (error) {
      expect(error.message).toBe('Destination timika is not supported.');
    }
  });
});
