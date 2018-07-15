import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import store from 'store';

import App from './components/App';
import rootReducer from './reducers';

import setAuthorizationToken from '../src/helpers/setAuthorizationToken';
import decodeToken from '../src/helpers/decodeToken';
import { setCurrentUser } from '../src/actions/auth';
import { LOCAL_STORAGE_KEY } from '../src/config/constants';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

/* eslint no-underscore-dangle: ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] }] */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reduxStore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware)),
);

const authorizationToken = store.get(LOCAL_STORAGE_KEY) || '';

reduxStore.dispatch(setCurrentUser(decodeToken(authorizationToken)));
setAuthorizationToken(authorizationToken);

ReactDOM.render(
  <Provider store={reduxStore}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
