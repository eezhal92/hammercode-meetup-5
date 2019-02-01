import React from 'react';

function Product ({ title, price = 0 }) {
  return (
    <div className="card">
      <div className="card__detail">
        <h2 className="title-5 mb-2">{title}</h2>

        <div>${price}</div>
      </div>
    </div>
  );
}

export default Product;
