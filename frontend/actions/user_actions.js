import {
  postFollow,
  postUnfollow
} from '../util/user_api_util';

export const FOLLOW_USER = 'FOLLOW_USER';
export const UNFOLLOW_USER = 'UNFOLLOW_USER';

const receiveFollow = results => ({
  type: FOLLOW_USER,
  results
});

const receiveUnfollow = results => ({
  type: UNFOLLOW_USER,
  results
});

export const followUser = userId => dispatch => (
  postFollow(userId)
    .then(
      results => dispatch(receiveFollow(results))
    )
);

export const unfollowUser = userId => dispatch => (
  postUnfollow(userId).then(results => dispatch(receiveUnfollow(results)))
);