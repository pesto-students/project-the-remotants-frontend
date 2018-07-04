import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import App from './components/App';
import rootReducer from './reducers';

import setAuthorizationToken from '../src/helpers/setAuthorizationToken';
import decodeToken from '../src/helpers/decodeToken';
import { setCurrentUser } from '../src/actions/auth';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

/* eslint no-underscore-dangle: ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] }] */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware)),
);

const authorizationToken = JSON.parse(localStorage.getItem('the-remotants')) || '';

store.dispatch(setCurrentUser(decodeToken(authorizationToken)));
setAuthorizationToken(authorizationToken);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
