const BaseCourier = require('./base');

class POSCourier extends BaseCourier {
  constructor (destination) {
    super(destination);
    this.availableDestinations = [
      { id: 'palu', distance: 0, baseCost: 10 },
      { id: 'donggala', distance: 50, baseCost: 20 },
      { id: 'manado', distance: 948, baseCost: 50 },
    ];
  }

  getCostMap () {
    return this.availableDestinations.map(dest => ({
      [dest.id]: dest.baseCost
    }))
      .reduce((acc, item) => Object.assign(acc, item), {})
  }
}

module.exports = POSCourier;
