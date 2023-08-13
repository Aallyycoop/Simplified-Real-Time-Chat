import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './slices/index.js';

import './index.scss';
import init from './init';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const initComponent = await init();
  root.render(
    <Provider store={store}>
      {initComponent}
    </Provider>,
  );
};

app();
