import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './App';
import '@fontsource/roboto';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';
import { history } from './axios';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
