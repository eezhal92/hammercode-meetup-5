import React from 'react';

import { getProductById } from '../request';

import AppContext from '../context';

const images = {
  'product-1': '/static/images/ydkjs.jpg',
  'product-2': '/static/images/eloquentjs.jpg',
  'product-3': '/static/images/effectiveengineer.jpg',
  'product-4': '/static/images/cleancode.jpg',
}

class ProductDetail extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      product: null,
      isFetched: false,
      error: null,
    };
  }

  componentDidMount () {
    this.fetchProduct();
  }

  fetchProduct () {
    const productId = this.props.match.params.id;

    return new Promise((resolve, reject) => {
      const foundProduct = this.context.data.products
        .find(product => product.id === productId)

      if (foundProduct) return resolve(foundProduct);

      return getProductById(productId)
        .then((data) => {
          resolve(data.product);
        })
        .catch(reject);
    })
      .then((product) => {
        this.setState({ product: product, isFetched: true });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  render  () {
    const { product, isFetched, error } = this.state;

    const productName = isFetched
        ? product.name
        : 'Loading...'

    if (error) {
      return (
        <div>
          <h1 className="title-2 mb-2">Ooops. Nothing found</h1>
        </div>
      );
    }

    const imageSrc = images[this.props.match.params.id]

    return (
      <AppContext.Consumer>
        {value => (
          <div>
            <div className="product-info">
              <div onClick={() => value.setImagePreview(imageSrc)} tabIndex="0" className="product-info__img-wrapper">
                <img className="product-info__img" src={imageSrc} />
              </div>

              <div className="product-info__meta">
                <h1 className="title-2 mb-2">{productName}</h1>

                <div className="mb-2">
                  <span className="title-5">${isFetched ? product.price : ''}</span>
                </div>

                <div className="mb-2">
                  <button className="btn js-add-btn" onClick={() => value.addCartItem(product)}>Add to cart</button>
                </div>
              </div>
            </div>

            <div>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

ProductDetail.contextType = AppContext

export default ProductDetail;
