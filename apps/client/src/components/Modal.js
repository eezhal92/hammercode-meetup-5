import React from 'react';
import ReactDOM from 'react-dom';

class Modal extends React.Component {
  constructor (props) {
    super(props);
    this.el = document.createElement('div');
    this.parent = document.querySelector('#modal');
  }

  componentDidMount () {
    this.parent.appendChild(this.el);
  }

  componentWillUnmount () {
    this.parent.removeChild(this.el);
  }

  render () {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}

export default Modal;
