import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import App from './containers/app'
import reducers from './reducers/root'

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

function configureStore() {
  const store = createStoreWithMiddleware(reducers);

  return store;
}

const store = configureStore();

const TheApp = () => {
    return <App store={ store } />
}
export default TheApp;