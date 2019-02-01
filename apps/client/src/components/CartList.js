import React from 'react';

import CartItem from './CartItem';

function CartList ({ lineItems, onRemove, onUpdateQty }) {
  const isEmpty = lineItems.length === 0;

  return (
    <div className="cart-list">
      {(() => {
        if (isEmpty) {
          return <div>Your cart is empty...</div>
        }

        return (
          <>
            <div className="cart-items-wrapper">
              {lineItems.map(({ productId, name, price, qty }) => (
                <CartItem
                  key={productId}
                  id={productId}
                  name={name}
                  price={price}
                  qty={qty}
                  onRemove={onRemove}
                  onUpdateQty={onUpdateQty}
                />
              ))}
            </div>
          </>
        );
      })()}
    </div>
  );
}
export default CartList;
