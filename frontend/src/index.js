import './styles/styles.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './slices/index.js';

import './index.css';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
// eslint-disable-next-line functional/no-expression-statements
console.log('store', store);
console.log('store.getstate', store.getState());
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
