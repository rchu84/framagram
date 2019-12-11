import React from "react";
import ReactDOM from "react-dom";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import configureStore from './store/store';
import Root from './components/root';

import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import { login, logout, signup } from './actions/session_actions';
import { fetchPosts, fetchPost } from './actions/post_actions';

import { parseJwt } from './util/util';

library.add(fab, faEllipsisH);

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
  window.fetchPost = fetchPost;
  // -------------

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root);
});