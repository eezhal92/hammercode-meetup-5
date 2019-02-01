import React from 'react';

const AppContext = React.createContext({
  data: {
    products: [],
    cart: {
      id: '',
      lineItems: [],
    },
    coupon: null,
  },

  dispatch: () => {},
  addCartItem: () => {},
  handleRemove: () => {},
  handleUpdateQty: () => {},
  setImagePreview: () => {},
});

export default AppContext;
