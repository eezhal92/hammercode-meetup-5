import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';

import AppContext from '../context';

import { getProducts } from '../request';
import * as actions from '../reducer/actions';

const Product = React.lazy(() => import('../components/Product'));

class Home extends React.Component {
  componentDidMount () {
    this.fetchProducts();
  }

  fetchProducts () {
    getProducts()
      .then((data) => {
        this.context.dispatch({
          type: actions.RECEIVE_PRODUCTS,
          payload: {
            products: data.products,
          }
        });
      });
  }

  render () {
    return (
      <div className="home">
        <AppContext.Consumer>
          {value => (
            <>
              <h1 className="title-2 mb-2">Best Selling</h1>
              <Suspense fallback={<div>Loading...</div>}>
                <div className="event-list">
                  {value.data.products.map((product) => (
                    <div className="product-wrapper" key={product.id}>
                      <Link className="no-underline" to={`/product/${product.id}`}>
                        <Product title={product.name} price={product.price} />
                      </Link>
                    </div>
                  ))}
                </div>
              </Suspense>
            </>
          )}
        </AppContext.Consumer>
      </div>
    );
  }
}

Home.contextType = AppContext;

export default Home;
