const BaseCourier = require('./base');

class JNECourier extends BaseCourier {
  getCostMap () {
    return {
      palu: 15,
      donggala: 25,
    };
  }
}

module.exports = JNECourier;
