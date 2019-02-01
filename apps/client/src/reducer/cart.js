import * as actions from './actions';
import { toLineItem } from '../utils';

const initialState = {
  id: null,
  lineItems: [],
};

export default function reducer (state = initialState, { type, payload }) {
  switch (type) {
    case actions.RECEIVE_CART:
      return payload.cart;
    case actions.ADD_LINE_ITEM:
      const { lineItems } = state;
      const lineItemIndex = lineItems.findIndex(item => item.productId === payload.product.id)
      const isExists = lineItemIndex !== -1;

      if (!isExists) {
        return {
          ...state,
          lineItems: lineItems.concat(toLineItem(payload.product, payload.qty)),
        };
      }

      const existingLineItem = lineItems[lineItemIndex];
      const newQty = existingLineItem.qty + payload.qty;
      const updatedLineItem = { ...existingLineItem, qty: newQty };
      const updateLineItems = JSON.parse(JSON.stringify(lineItems));
      updateLineItems[lineItemIndex] = updatedLineItem;

      return {
        ...state,
        lineItems: updateLineItems,
      };
    case actions.REMOVE_LINE_ITEM:
      return {
        ...state,
        lineItems: state.lineItems.filter(item => item.productId !== payload.productId),
      };
    case actions.SET_LINE_ITEM_QTY:
      return {
        ...state,
        lineItems: state.lineItems.map((item) => {
          if (item.productId === payload.productId) {
            return { ...item, qty: payload.qty };
          }

          return item;
        }),
      };
    default:
      return state;
  }
}
