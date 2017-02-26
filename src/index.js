import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import reduxThunk from 'redux-thunk';
import { AUTH_USER } from './actions/type';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
export const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');


if(token) {
  store.dispatch({ type: AUTH_USER });
}



ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>
  , document.querySelector('.container'));
