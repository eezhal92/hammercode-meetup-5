import React from 'react';
import { Link } from 'react-router-dom';

import { getTotal } from '../utils';
import AppContext from '../context';
import CartList from '../components/CartList';

function Cart () {
  return (
    <AppContext.Consumer>
      {value => (
        <div>
          <h1 className="title-2 mb-2">Cart</h1>

          <CartList
            lineItems={value.data.cart.lineItems}
            onRemove={value.handleRemove}
            onUpdateQty={value.handleUpdateQty}
          />

          <div className="total">
            <span>Total</span>
            <span>${getTotal(value.data.cart.lineItems, value.data.coupon)}</span>
          </div>

          {(() => {
            if (!value.data.cart.lineItems.length) {
              return null;
            }

            return (
              <div className="action-wrapper">
                <Link to="/checkout" className="btn btn--blue">Checkout</Link>
              </div>
            );
          })()}
        </div>
      )}
    </AppContext.Consumer>
  );
}

export default Cart;
