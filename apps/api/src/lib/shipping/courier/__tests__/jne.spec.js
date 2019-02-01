const JNECourier = require('../jne');

describe('JNECourier', () => {
  test('should implement correct `getCostMap`', () => {
    // Currently we only support palu and donggala
    const jne = new JNECourier('palu');

    expect(jne.getCostMap()).toEqual({
      palu: 15,
      donggala: 25,
    });
  });

  test('`calculate` should return correct cost', () => {
    const jne = new JNECourier('palu');
    expect(jne.calculate()).toEqual(15);

    jne.destination = 'donggala'
    expect(jne.calculate()).toEqual(25);
  });
});
