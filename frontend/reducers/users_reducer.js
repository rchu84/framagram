import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_POSTS, RECEIVE_POST } from '../actions/post_actions';
import { FOLLOW_USER, UNFOLLOW_USER, RECEIVE_FOLLOWERS, RECEIVE_FOLLOWING, RECEIVE_USERS } from '../actions/user_actions';

const _defaultUsers = {};

export default (state = _defaultUsers, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, { [action.user.id]: action.user });
    case RECEIVE_POSTS:
    case RECEIVE_POST:
    case RECEIVE_FOLLOWERS:
    case RECEIVE_FOLLOWING:
    case RECEIVE_USERS:
      return Object.assign({}, state, action.results.users);
    case FOLLOW_USER:
      newState[action.results.follower_id].followingIds.push(action.results.following_id);
      newState[action.results.following_id].followerIds.push(action.results.follower_id);
      return newState;
    case UNFOLLOW_USER:
      newState[action.results.follower_id].followingIds = newState[action.results.follower_id].followingIds.filter(item => item !== action.results.following_id);
      newState[action.results.following_id].followerIds = newState[action.results.following_id].followerIds.filter(item => item !== action.results.follower_id);
      return newState;
    default:
      return state;
  }
};