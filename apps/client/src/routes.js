import React from 'react';
import { Route } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductDetail from './pages/ProductDetail';

const AppRouter = () => (
  <>
    <Route path="/" exact component={Home} />
    <Route path="/product/:id" exact component={ProductDetail} />
    <Route path="/cart" exact component={Cart} />
    <Route path="/checkout" exact component={Checkout} />
  </>
);

export default AppRouter;
