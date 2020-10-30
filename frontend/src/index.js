import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';
import axios from "axios";
import { 
  fetchAllTransactions,
  logTransaction,
  updateTransaction,
  deleteTransaction
} from "./actions/transactions_actions";
import { 
  fetchBudgetBreakdown, 
  updateBudgetBreakdown
} from "./actions/budget_actions";

import "./stylesheets/_index.scss";


document.addEventListener('DOMContentLoaded', () => {
  let store;

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    
    const decodedUser = jwt_decode(localStorage.jwtToken);
    const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;

    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/login';
    }
  } else {
    store = configureStore({});
  }
  const root = document.getElementById('root');

  ReactDOM.render(<Root store={store} />, root);
  window.axios = axios;
  window.dispatch = store.dispatch;
  // window.fetchAllUsers = fetchAllUsers;
  // window.fetchCurrentUser = fetchCurrentUser;
  window.fetchBudgetBreakdown = fetchBudgetBreakdown;
  window.updateBudgetBreakdown = updateBudgetBreakdown;
  window.fetchAllTransactions = fetchAllTransactions;
  window.logTransaction = logTransaction;
  window.updateTransaction = updateTransaction;
  window.deleteTransaction = deleteTransaction;
});