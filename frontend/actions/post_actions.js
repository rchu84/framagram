import { getPosts, postPost } from '../util/post_api_util';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const UPDATE_FILTER = 'UPDATE_FILTER';

const receivePosts = results => ({
  type: RECEIVE_POSTS,
  results
});

const receivePost = post => ({
  type: RECEIVE_POST,
  post
});

const receiveFilter = (filter, value) => ({
  type: UPDATE_FILTER,
  filter,
  value
});

export const fetchPosts = filters => dispatch => (
  getPosts(filters).then(results => dispatch(receivePosts(results)))
);

export const createPost = formPost => dispatch => (
  postPost(formPost)
    .then(
      post => dispatch(receivePost(post))
    )
);

export const updateFilter = (filter, value) => (dispatch, getState) => {
  dispatch(receiveFilter(filter, value));
  return fetchPosts(getState().filters)(dispatch);
}