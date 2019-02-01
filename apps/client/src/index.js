import React from 'react';
import { render } from 'react-dom';
import App from './App';

const mountEl = document.querySelector('#app');

render(<App />, mountEl);
