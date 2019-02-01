import * as actions from './actions';

const initialState = [];

export default function reducer (state = initialState, { type, payload }) {
  switch (type) {
    case actions.RECEIVE_PRODUCTS:
      return payload.products;
    default:
      return state;
  }
}
