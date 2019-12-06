import React from "react";
import ReactDOM from "react-dom";

import configureStore from './store/store';
import Root from './components/root';

import { login, logout, signup } from './actions/session_action';

import { parseJwt } from './util/util';

document.addEventListener("DOMContentLoaded", () => {

  let store;
  let currentUser = parseJwt(localStorage.token);
  if (currentUser) {
    delete currentUser.exp;
    const preloadedState = {
      entities: {
        users: { [currentUser.id]: currentUser }
      },
      session: { id: currentUser.id }
    }
    store = configureStore(preloadedState);
  } else {
    store = configureStore();
  }


  // Testing only!!
  window.getState = store.getState;
  window.dispatch = store.dispatch;

  window.login = login;
  window.logout = logout;
  window.signup = signup;
  // -------------

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root);
});