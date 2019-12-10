import React from "react";
import ReactDOM from "react-dom";

import configureStore from './store/store';
import Root from './components/root';

import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import { login, logout, signup } from './actions/session_actions';
import { fetchPosts } from './actions/post_actions';

import { parseJwt } from './util/util';

document.addEventListener("DOMContentLoaded", () => {

  let store;
  window.currentUser = parseJwt(localStorage.token);
  if (window.currentUser) {
    delete window.currentUser.exp;
    const preloadedState = {
      entities: {
        users: { [currentUser.id]: currentUser }
      },
      session: { id: currentUser.id }
    }
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }


  // Testing only!!
  window.getState = store.getState;
  window.dispatch = store.dispatch;

  window.login = login;
  window.logout = logout;
  window.signup = signup;

  window.fetchPosts = fetchPosts;
  // -------------

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root);
});