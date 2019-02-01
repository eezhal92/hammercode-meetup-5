import * as actions from './actions';

const initialState = null;

export default function reducer (state = initialState, { type, payload }) {
  switch (type) {
    case actions.SET_COUPON:
      return payload.coupon;
    default:
      return state;
  }
}
