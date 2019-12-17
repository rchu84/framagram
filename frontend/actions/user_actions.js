import {
  postFollow,
  postUnfollow,
  getUser,
  getFollowers,
  getFollowing,
  getSearchUsers
} from '../util/user_api_util';

import { RECEIVE_POSTS } from './post_actions';

export const FOLLOW_USER = 'FOLLOW_USER';
export const UNFOLLOW_USER = 'UNFOLLOW_USER';
export const RECEIVE_FOLLOWERS = 'RECEIVE_FOLLOWERS';
export const RECEIVE_FOLLOWING = 'RECEIVE_FOLLOWING';
export const RECEIVE_USERS = 'RECEIVE_USERS';

const receiveFollowers = results => ({
  type: RECEIVE_FOLLOWERS,
  results
});

const receiveFollowing = results => ({
  type: RECEIVE_FOLLOWING,
  results
})

const receiveFollow = results => ({
  type: FOLLOW_USER,
  results
});

const receiveUnfollow = results => ({
  type: UNFOLLOW_USER,
  results
});

const receivePosts = results => ({
  type: RECEIVE_POSTS,
  results
});

const receiveUsers = results => ({
  type: RECEIVE_USERS,
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

export const fetchPostsByUsername = filters => dispatch => (
  getUser(filters).then(results => dispatch(receivePosts(results)))
);

export const fetchFollowers = userId => dispatch => (
  getFollowers(userId).then(results => dispatch(receiveFollowers(results)))
);

export const fetchFollowing = userId => dispatch => (
  getFollowing(userId).then(results => dispatch(receiveFollowing(results)))
);

export const searchUsers = query => dispatch => (
  getSearchUsers(query).then(results => dispatch(receiveUsers(results)))
);