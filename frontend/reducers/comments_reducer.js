import {
  RECEIVE_POSTS,
  RECEIVE_POST,
  REMOVE_POST
} from '../actions/post_actions';

import {
  RECEIVE_COMMENT,
  REMOVE_COMMENT
} from '../actions/comment_actions';

const commentsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_POSTS:
    case RECEIVE_COMMENT:
    case RECEIVE_POST:
      return Object.assign({}, state, action.results.comments);
    case REMOVE_COMMENT:
      let newState = Object.assign({}, state);
      delete newState[action.comment.id];
      return newState;
    default:
      return state;
  }
}

export default commentsReducer;