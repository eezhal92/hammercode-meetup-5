const { POSCourier, JNECourier } = require('./courier')

class Shipping {
  constructor ({
    name,
    address,
    destination,
    selectedCourier,
  }) {
    this.name = name;
    this.address = address;
    this.destination = destination;

    switch (selectedCourier) {
      case 'jne':
        this.courier = new JNECourier(this.destination);
        break;
      case 'pos':
        this.courier = new POSCourier(this.destination);
        break;
      default:
        throw new Error(`${selectedCourier} courier is not supported.`)
    }
  }

  get cost () {
    return this.courier.calculate();
  }
}

module.exports = Shipping;
