import React from 'react';

import { getTotal } from '../utils';
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
            <div className="cart-total">
              <span>Total</span>
              <span>${getTotal(lineItems)}</span>
            </div>
          </>
        );
      })()}
    </div>
  );
}
export default CartList;
