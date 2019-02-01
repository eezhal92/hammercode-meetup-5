const ENDPOINT_BASE_URL = getEndpointBaseUrl();

function getEndpointBaseUrl () {
  const isProd = process.env.NODE_ENV === 'production';

  return isProd
    ? 'https://kios-demo-api.now.sh'
    : 'http://localhost:3000';
}

const toJSON = function (response) {
  if (response.status === 404) {
    throw new Error('Not found');
  }
  return response.json();
};

export function getProducts () {
  return fetch(ENDPOINT_BASE_URL + '/api/products')
    .then(toJSON)
}

export function getProductById (productId) {
  return fetch(ENDPOINT_BASE_URL + '/api/products/' + productId)
    .then(toJSON)
}

export function getCart (cartId) {
  return fetch(ENDPOINT_BASE_URL + '/api/carts/' + cartId)
    .then(toJSON);
}

export function createCart () {
  return fetch(ENDPOINT_BASE_URL + '/api/carts', {
    method: 'POST',
  })
  .then(toJSON);
}

export function addItem (cartId, product) {
  return fetch(ENDPOINT_BASE_URL + '/api/carts/' + cartId + '/line-items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item: {
        productId: product.id,
        qty: 1,
      }
    })
  })
  .then(toJSON);
}

export function removeItem (cartId, productId) {
  return fetch(ENDPOINT_BASE_URL + '/api/carts/' + cartId + '/line-items/' + productId, {
    method: 'DELETE',
  })
  .then(toJSON);
}

export function updateItemQty (cartId, productId, qty) {
  return fetch(ENDPOINT_BASE_URL + '/api/carts/' + cartId + '/line-items/' + productId, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      qty
    }),
  })
  .then(toJSON);
}
