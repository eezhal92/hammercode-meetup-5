import cart from './cart';
import products from './products';

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
});

export default rootReducer;
