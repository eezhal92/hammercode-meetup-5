import React from 'react';

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
        </div>
      )}
    </AppContext.Consumer>
  );
}

export default Cart;
