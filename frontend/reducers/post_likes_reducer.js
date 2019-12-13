import {
  RECEIVE_POST_LIKES,
  RECEIVE_POST_LIKE,
  REMOVE_POST_LIKE,
  RECEIVE_POSTS,
  RECEIVE_POST,
  REMOVE_POST
 } from '../actions/post_actions';

const postLikesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_POST_LIKES:
    case RECEIVE_POSTS:
    case RECEIVE_POST_LIKE:
    case RECEIVE_POST:
      return Object.assign({}, state, action.results.post_likes);
    case REMOVE_POST_LIKE:
      let newState = Object.assign({}, state);
      delete newState[action.postLike.id];
      return newState;
    default:
      return state;
  }
}

export default postLikesReducer;