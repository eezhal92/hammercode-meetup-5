import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import debounce from 'lodash/debounce';

import * as api from './request';
import rootReducer from './reducer';
import * as actions from './reducer/actions';

import AppRouter from './routes';
import AppContext from './context';
import Footer from './components/Footer';
import MainNav from './components/MainNav';
import Modal from './components/Modal';
import ImagePreview from './components/ImagePreview';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.dispatch = this.dispatch.bind(this);
    this.addCartItem = this.addCartItem.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleUpdateQty = this.handleUpdateQty.bind(this);
    this.updateItemQty = debounce(this.updateItemQty, 500)
    this.setImagePreview = this.setImagePreview.bind(this);

    this.state = {
      data: {
        products: [],
        cart: {
          id: '',
          lineItems: [],
        },
        coupon: null,
      },

      imagePreviewSrc: false,

      dispatch: this.dispatch,
      addCartItem: this.addCartItem,
      handleRemove: this.handleRemove,
      handleUpdateQty: this.handleUpdateQty,
      setImagePreview: this.setImagePreview,
    }
  }

  componentDidMount () {
    this.fetchCart();
  }

  updateItemQty (payload) {
    let cartId = localStorage.getItem('cartId');

    return api.updateItemQty(cartId, payload.productId, payload.qty);
  }

  /**
   *
   * @param {object} action
   * @param {string} action.type
   * @param {any?}   action.payload
   */
  dispatch (action, cb = () => {}) {
    this.setState(prevState => ({
      data: rootReducer(prevState.data, action)
    }), cb);
  }

  handleUpdateQty ({ productId, qty }) {
    this.dispatch({
      type: actions.SET_LINE_ITEM_QTY,
      payload: {
        productId,
        qty,
      },
    }, () => {
      this.updateItemQty({ productId, qty })
    });
  }

  fetchCart () {
    let cartId = localStorage.getItem('cartId');

    if (!cartId) return

    api.getCart(cartId)
      .then((data) => {
        this.dispatch({
          type: actions.RECEIVE_CART,
          payload: {
            cart: data.cart,
          },
        });
      })
      .catch((error) => {
        localStorage.removeItem('cartId');
        throw error;
      });
  }

  setImagePreview (imageSrc) {
    this.setState(() => ({
      imagePreviewSrc: imageSrc,
    }));
  }

  handleRemove (productId) {
    let cartId = localStorage.getItem('cartId');

    this.dispatch({
      type: actions.REMOVE_LINE_ITEM,
      payload: {
        productId,
      },
    });
    return api.removeItem(cartId, productId);
  }

  addCartItem (product) {
    this.dispatch({
      type: actions.ADD_LINE_ITEM,
      payload: {
        product,
        qty: 1
      },
    });

    return new Promise((resolve, reject) => {
      let cartId = localStorage.getItem('cartId');

      if (cartId) {
        return resolve(cartId);
      }

      api.createCart()
        .then((data) => {
          cartId = data.cart.id;
          localStorage.setItem('cartId', cartId);

          resolve(cartId);
        })
        .catch(reject);
    })
      .then((cartId) => {
        return api.addItem(cartId, product)
      });
  }

  render () {
    const { imagePreviewSrc, data } = this.state;

    return (
      <AppContext.Provider value={this.state}>
        <Router>
          <>
            <MainNav cart={data.cart} coupon={data.coupon} />
            <AppRouter/>
            <Footer />

            {imagePreviewSrc && (
              <Modal>
                <ImagePreview
                  src={imagePreviewSrc}
                  onOverlayClick={() => this.setImagePreview(null)}
                />
              </Modal>
            )}
          </>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;
