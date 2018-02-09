// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import configureStore from './store/configure-store';


const store = configureStore({
  STATE: {loggedIn: 0},
  CASES: {},
  ACCOUNTS: {}
});


ReactDOM.render(
  <Provider store={store}>
       <App />
  </Provider>,
  document.getElementById('root')
);
