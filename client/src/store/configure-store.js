import rootReducer from '../reducers/index';
import {createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const enhancers = composeWithDevTools(applyMiddleware(thunk));

export default (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    enhancers
  );
};
