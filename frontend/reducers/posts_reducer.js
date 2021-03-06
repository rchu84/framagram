import { RECEIVE_POSTS, RECEIVE_POST, REMOVE_POST } from '../actions/post_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';

const postsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_POSTS:
      //return action.results.posts || {};
    case RECEIVE_POST:
      //return Object.assign({}, state, { [action.post.id]: action.post });
      return Object.assign({}, state, action.results.posts);
    case REMOVE_POST:
      let newState = Object.assign({}, state);
      delete newState[action.post.id];
      return newState;
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
}

export default postsReducer;