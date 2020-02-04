import { RECEIVE_POST_ERRORS, RECEIVE_POST, CLEAR_POST_ERRORS } from '../actions/post_actions';

const _defaultErrors = [];

export default (state = _defaultErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_POST_ERRORS:
      return action.errors.responseJSON;
    case RECEIVE_POST:
    case CLEAR_POST_ERRORS:
      return _defaultErrors;
    default:
      return state;
  }
};