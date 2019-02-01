import React from 'react';

export default class CouponForm extends React.Component {
  constructor (props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.persist();
    event.preventDefault();
    const couponCode = event.target.couponCode.value;

    this.props.onSubmit(couponCode);
  }

  render () {
    return (
      <form className="coupon-form" onSubmit={this.handleSubmit}>
        <h3 className="title-4">Apply Coupon</h3>

        <div className="input-wrapper">
          <input className="input" name="couponCode" type="text" autoComplete="off" placeholder="Coupon code" />
        </div>

        <div className="coupon-form__action">
          <button className="btn">Apply</button>
        </div>
      </form>
    );
  }
}
