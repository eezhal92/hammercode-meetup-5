export function getTotal (cartItems) {
  return cartItems.reduce((acc, item) => acc + (item.qty * item.price), 0);
}

export function toLineItem (product, qty) {
  const { id: productId, name, price } = product;

  return {
    productId,
    name,
    price,
    qty,
  };
}
