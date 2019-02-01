export function getTotal (cartItems, coupon) {
  const total = cartItems.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const discount = calculateDiscount(total, coupon)

  return total - discount;
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

export function calculateDiscount (total, coupon) {
  if (!coupon) return 0;

  if (coupon.type === 'percent') {
    return total * (coupon.amount / 100);
  }

  return coupon.amount;
}
