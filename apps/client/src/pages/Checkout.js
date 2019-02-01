import React from 'react';

import { getCoupon } from '../request';
import { getTotal } from '../utils';
import AppContext from '../context';
import * as actions from '../reducer/actions';

import CartList from '../components/CartList';
import CouponForm from '../components/CouponForm';

class Checkout extends React.Component {
  constructor (props) {
    super(props);

    this.handleCouponSubmit = this.handleCouponSubmit.bind(this);
  }

  componentDidMount () {
    this.validateCart();
  }

  handleCouponSubmit (couponCode) {
    return getCoupon(couponCode)
      .then((data) => {
        this.context.dispatch({
          type: actions.SET_COUPON,
          payload: {
            coupon: data.coupon,
          },
        });
      })
      .catch((error) => {
        this.context.dispatch({
          type: actions.SET_COUPON,
          payload: {
            coupon: null,
          },
        });

        throw error;
      });
  }

  validateCart () {
    if (!this.context.data.cart.lineItems.length) {
      this.props.history.push('/');
    }
  }

  render () {
    return (
      <AppContext.Consumer>
        {value => (
          <div>
            <h1 className="title-2 mb-2">Checkout</h1>

            <CartList
              lineItems={value.data.cart.lineItems}
              onRemove={value.handleRemove}
              onUpdateQty={value.handleUpdateQty}
            />

            <div className="total">
              <span>Sub Total</span>
              <span>${getTotal(value.data.cart.lineItems)}</span>
            </div>

            <CouponForm onSubmit={this.handleCouponSubmit} />

            <div className="total">
              <span>Total</span>
              <span>${getTotal(value.data.cart.lineItems, value.data.coupon)}</span>
            </div>

            <div className="action-wrapper">
              <button className="btn btn--blue">Pay</button>
            </div>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

Checkout.contextType = AppContext;

export default Checkout;
