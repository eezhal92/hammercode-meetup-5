var request = require('supertest');
var app = require('../../../src/app');
var utils = require('../../utils');
var cart = require('../../../src/lib/cart');
var cartRepo = require('../../../src/repo/cart');

var url = utils.url;

var persistedCart = null;

beforeAll(function () {
  var initialLineItems = [
    { productId: 'product-1', name: 'YDKJS', price: 20, qty: 1 },
    { productId: 'product-2', name: 'Eloquent JS', price: 20, qty: 2 },
    { productId: 'product-3', name: 'Effective Engineer', price: 50, qty: 3 },
  ];
  var c = cart.create(initialLineItems);

  persistedCart = cartRepo.persist(c);
});

describe('PATCH /api/carts/:id/line-items/:productId', function () {
  test('should return 200 when item\'s qty is updated', async function () {
    var URL = url('/carts/' + persistedCart.id + '/line-items/product-1')
    var payload = {
      qty: 3,
    };

    await request(app)
      .patch(URL)
      .send(payload)
      .expect('Content-Type', /json/)
      .then(function (response) {
        var body = response.body;

        expect(response.status).toBe(200);
        expect(typeof body.cart.id).toBe('string');
        expect(Array.isArray(body.cart.lineItems)).toBe(true);
        expect(body.cart.lineItems.length).toBe(3);
        expect(body.cart.lineItems[0].productId).toBe('product-1');
        expect(body.cart.lineItems[0].name).toBe('YDKJS');
        expect(body.cart.lineItems[0].price).toBe(20);
        expect(body.cart.lineItems[0].qty).toBe(3);
        expect(body.total).toBe(250);
      });
  });

  test('should return 404 when trying to remove non-existent cart', async function () {
    var URL = url('/carts/dummy-id/line-items/product-1')

    await request(app)
      .delete(URL)
      .expect('Content-Type', /json/)
      .then(function (response) {
        var body = response.body;

        expect(response.status).toBe(404);
        expect(body.message).toBe('Cart with ID `dummy-id` was not found');
      });
  });
});
