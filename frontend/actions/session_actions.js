import { postUser, postSession, deleteSession } from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
});

const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});

const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const clearErrorsOnRouteChange = () => dispatch => (
  dispatch(clearErrors())
);

export const login = formUser => dispatch => (
  postSession(formUser)
    .then(
      resp => {
        localStorage.setItem("token", resp.token)
        dispatch(receiveCurrentUser(resp.user))
      },
      errors => dispatch(receiveErrors(errors))
    )
);

export const logout = () => dispatch => (
  deleteSession()
    .then(
      () => {
        localStorage.removeItem("token")
        dispatch(logoutCurrentUser())
      },
      errors => dispatch(receiveErrors(errors))
    )
);

export const signup = formUser => dispatch => (
  postUser(formUser)
    .then(
      resp => {
        localStorage.setItem("token", resp.token)
        dispatch(receiveCurrentUser(resp.user))
      },
      errors => dispatch(receiveErrors(errors))
    )
);
