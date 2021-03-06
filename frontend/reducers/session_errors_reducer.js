import { RECEIVE_ERRORS, RECEIVE_CURRENT_USER, CLEAR_ERRORS } from '../actions/session_actions';

const _defaultErrors = [];

export default (state = _defaultErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ERRORS:
      return action.errors.responseJSON;
    case RECEIVE_CURRENT_USER:
    case CLEAR_ERRORS:
      return _defaultErrors;
    default:
      return state;
  }
};