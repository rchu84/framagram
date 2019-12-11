import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_POSTS, RECEIVE_POST } from '../actions/post_actions';

const _defaultUsers = {};

export default (state = _defaultUsers, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, { [action.user.id]: action.user });
    case RECEIVE_POSTS:
      return Object.assign({}, state, action.results.users);
    case RECEIVE_POST:
      return Object.assign({}, state, action.results.users);
    default:
      return state;
  }
};