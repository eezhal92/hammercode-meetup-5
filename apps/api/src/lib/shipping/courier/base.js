class BaseCourier {
  constructor (destination) {
    if (this.__proto__.constructor === BaseCourier) {
      throw new Error('Cannot create BaseCourier instance. It should be extended by another class.');
    }

    this.destination = destination;
  }

  calculate () {
    if (!this.supported) {
      throw new Error(`Destination ${this.destination} is not supported.`)
    }
    return this.getCostMap()[this.destination]
  }

  get supported () {
    return this.getAvailableDestinations().includes(this.destination)
  }

  getAvailableDestinations () {
    return Object.keys(this.getCostMap());
  }

  getCostMap () {
    throw new Error('getCostMap is not implemented')
  }
}

module.exports = BaseCourier;
