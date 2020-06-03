import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import ColorGenerator from './ColorGenerator';

ReactDOM.render(
      <Provider store={store}>
    <ColorGenerator />
  </Provider>,
  document.getElementById('app-body')
);
