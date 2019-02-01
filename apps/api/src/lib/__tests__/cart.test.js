var cart = require('../cart');

function setupCart (products) {
  if (!products) {
    products = [
      {
        id: 'product-1',
        name: 'Laravel',
        price: 60,
        description: 'Lorem'
      },
      {
        id: 'product-2',
        name: 'Eloquent JS',
        price: 40,
        description: 'Lorem',
      }
    ]
  }

  var c = cart.create();

  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    c = cart.addItem(c, product, 1);
  }

  return {
    cart: c,
    expectedTotal: 100,
  };
}

describe('cart module', () => {
  test('create cart', function () {
    var c = cart.create();

    expect(Array.isArray(c.lineItems)).toBe(true);
  });

  test('create cart with initial line items', function () {
    var initialLineItems = [
      { productId: 'product-1', name: 'Awesome Book', price: 20, qty: 3 },
      { productId: 'product-5', name: 'Good Book', price: 40,  qty: 2 },
    ];

    var c = cart.create(initialLineItems);

    expect(Array.isArray(c.lineItems)).toBe(true);
    expect(c.lineItems.length).toBe(2);

    expect(c.lineItems[0].productId).toBe('product-1');
    expect(c.lineItems[0].name).toBe('Awesome Book');
    expect(c.lineItems[0].price).toBe(20);
    expect(c.lineItems[0].qty).toBe(3);

    expect(c.lineItems[1].productId).toBe('product-5');
    expect(c.lineItems[1].name).toBe('Good Book');
    expect(c.lineItems[1].price).toBe(40);
    expect(c.lineItems[1].qty).toBe(2);
  });

  test('add product to cart', function () {
    var productA = {
      id: 'product-1',
      name: 'Book A',
      price: 50,
      description: 'Lorem',
    };
    var productB = {
      id: 'product-2',
      name: 'Book B',
      price: 20,
      description: 'Lorem',
    };

    var c = cart.create();

    c = cart.addItem(c, productA, 2);
    c = cart.addItem(c, productB, 1);

    var lineItems = c.lineItems;

    expect(lineItems.length).toBe(2);
    expect(lineItems[0].productId).toBe('product-1');
    expect(lineItems[0].name).toBe('Book A');
    expect(lineItems[0].price).toBe(50);
    expect(lineItems[0].qty).toBe(2);
    expect(lineItems[0].description).toBe(undefined);
    expect(lineItems[1].productId).toBe('product-2');
    expect(lineItems[1].name).toBe('Book B');
    expect(lineItems[1].price).toBe(20);
    expect(lineItems[1].qty).toBe(1);
    expect(lineItems[1].description).toBe(undefined);

    c = cart.addItem(c, productA, 1);

    lineItems = c.lineItems;

    expect(lineItems.length).toBe(2);
    expect(lineItems[0].productId).toBe('product-1');
    expect(lineItems[0].name).toBe('Book A');
    expect(lineItems[0].price).toBe(50);
    expect(lineItems[0].qty).toBe(3);
  });

  test('updateItemQty', function () {
    var setup = setupCart();
    var c = setup.cart;
    var lineItems = c.lineItems;

    expect(lineItems.length).toBe(2);
    expect(lineItems[1].productId).toBe('product-2');
    expect(lineItems[1].name).toBe('Eloquent JS');
    expect(lineItems[1].price).toBe(40);
    expect(lineItems[1].qty).toBe(1);

    c = cart.setItemQty(c, 'product-2', 2);
    lineItems = c.lineItems;

    expect(lineItems.length).toBe(2);
    expect(lineItems[1].productId).toBe('product-2');
    expect(lineItems[1].name).toBe('Eloquent JS');
    expect(lineItems[1].price).toBe(40);
    expect(lineItems[1].qty).toBe(2);
  });

  test('total', function () {
    var setup = setupCart();
    var c = setup.cart

    expect(cart.total(c)).toBe(setup.expectedTotal);

    var product = {
      id: 'product-3',
      name: 'ReactJS',
      price: 80,
      description: 'Lorem ipsum',
    }

    c = cart.addItem(c, product, 3);

    expect(cart.total(c)).toBe(340);
  });

  test('format', () => {
    expect(cart.format(8000)).toBe('$8,000')
    expect(cart.format(400)).toBe('$400')
  });

  test('removeItem', () => {
    var c = cart.create();

    c = cart.addItem(c, { id: 'product-1', price: 5 }, 5);
    c = cart.addItem(c, { id: 'product-2', price: 20 }, 2);
    c = cart.addItem(c, { id: 'product-3', price: 20 }, 1);

    c = cart.removeItem(c, 'product-2');

    expect(c.lineItems.length).toBe(2);
    expect(cart.total(c)).toBe(45);
  });
});
