/**
 * @param  {Entities.LineItem[]} initialLineItems
 * @return {Cart}
 */
function create(initialLineItems) {
  var lineItems = [];
  if (Array.isArray(initialLineItems)) {
    lineItems = initialLineItems;
  }

  return {
    id: generateID(),
    lineItems: lineItems,
  }
}

function generateID() {
  return Math.random().toString().replace('0.', '');
}

/**
 * @param  {Product} product
 * @return {LineItem}
 */
function createLineItem(product, qty) {
  return {
    productId: product.id,
    name: product.name,
    price: product.price,
    qty: qty
  }
}

/**
 * @param  {Cart}            cart
 * @param  {object}          payload
 * @param  {Array<LineItem>} payload.lineItems
 * @return {Cart}
 */
function updateCart (cart, payload) {
  return Object.assign(cart, payload);
}

/**
 * @param  {Cart} cart
 * @param  {Product} product
 * @param  {number} qty
 * @return {Cart}
 */
function addItem (cart, product, qty) {
  var lineItems = cart.lineItems;

  var isInCart = lineItems.find(function (lineItem) {
    return lineItem.productId === product.id;
  });

  if (!isInCart) {
    var lineItem = createLineItem(product, qty);

    return updateCart(cart, {
      lineItems: lineItems.concat(lineItem),
    });
  }

  return updateCart(cart, {
    lineItems: lineItems.map(function (lineItem) {
      if (lineItem.productId === product.id) {
        var newQty = lineItem.qty + qty;
        return Object.assign({}, lineItem, { qty: newQty });
      }

      return lineItem;
    }),
  });
}

/**
 * Menghitung jumlah total harga cart
 * @param  {Cart}     cart
 * @param  {Discount} discount
 * @return {number}   Total harga dari cart
 */
function total (cart, discount) {
  var lineItems = cart.lineItems;

  var sum =  lineItems.reduce(function (total, lineItem) {
    return total + (lineItem.qty * lineItem.price);
  }, 0);

  return sum;

  // return applyDiscount(sum, discount);
}

/**
 * Membuang line item
 * @param  {Cart}   cart
 * @param  {string} productId
 * @return {Cart}
 */
function removeItem (cart, productId) {
  var lineItems = cart.lineItems;

  return updateCart(cart, {
    lineItems: lineItems.filter(function (lineItem) {
      return lineItem.productId !== productId
    }),
  });
}

/**
 * @param  {Cart} cart
 * @param  {string} productId
 * @param  {number} qty
 * @return {Cart}
 */
function setItemQty (cart, productId, qty) {
  var lineItems = cart.lineItems;

  return updateCart(cart, {
    lineItems: lineItems.map(function (lineItem) {
      if (lineItem.productId === productId) {
        return Object.assign({}, lineItem, { qty: qty });
      }

      return lineItem;
    }),
  });
}

/**
 * Format ke bentuk lbh bagus dibaca
 * @param  {number} total
 * @return {string}
 */
function format (total) {
  return '$' + total.toLocaleString()
}

module.exports = {
  create,
  addItem,
  total,
  format,
  removeItem,
  setItemQty,
}
