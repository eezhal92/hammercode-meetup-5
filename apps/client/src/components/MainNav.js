import React from 'react';
import { Link } from 'react-router-dom';

import { getTotal } from '../utils';

function MainNav ({ cart }) {
  return (
    <ul className="main-nav">
      <li><Link className="home-link" to="/">Home</Link></li>
      <li><Link className="cart-link" to="/cart">Cart ${getTotal(cart.lineItems)}</Link></li>
    </ul>
  );
}

export default MainNav;
