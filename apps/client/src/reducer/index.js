import cart from './cart';
import products from './products';
import coupon from './coupon';

function combineReducers (reducers) {
  return (state = {}, action) => {
    return Object.keys(reducers)
      .reduce((nextState, key) => {
        nextState[key] = reducers[key](state[key], action)

        return nextState
      }, {});
  }
}

const rootReducer = combineReducers({
  cart,
  products,
  coupon,
});

export default rootReducer;
