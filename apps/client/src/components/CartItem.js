import React from 'react';

class CartItem extends React.Component {
  constructor (props) {
    super(props);

    this.handleQtyChange = this.handleQtyChange.bind(this);
  }

  handleQtyChange (event) {
    event.persist();
    const qty = parseInt(event.target.value, 10);

    this.props.onUpdateQty({
      productId: this.props.id,
      qty,
    });
  }

  render () {
    const { id, name, price, qty, onRemove } = this.props;

    return (
      <div className="cart-item">
        <div className="cart-item__remove-btn">
          <button
            data-product-id={id}
            onClick={() => onRemove(id)}
            className="btn btn--circle btn--red js-remove-btn"
          >
            &times;
          </button>
        </div>
        <div className="title-6">{name}</div>
        <div>
          ${price} x <input className="cart-item__qty-input" type="number" min="1" value={qty} onChange={this.handleQtyChange} />
        </div>
      </div>
    );
  }
}

export default CartItem;
