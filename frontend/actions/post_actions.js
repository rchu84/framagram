import { getPosts, postPost, getPost, patchPost, deletePost } from '../util/post_api_util';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const REMOVE_POST = 'REMOVE_POST';

const receivePosts = results => ({
  type: RECEIVE_POSTS,
  results
});

const receivePost = results => ({
  type: RECEIVE_POST,
  results
});

const receiveFilter = (filter, value) => ({
  type: UPDATE_FILTER,
  filter,
  value
});

const removePostFromState = post => ({
  type: REMOVE_POST,
  post
})

export const fetchPosts = filters => dispatch => (
  getPosts(filters).then(results => dispatch(receivePosts(results)))
);

export const fetchPost = postId => dispatch => (
  getPost(postId).then(results => dispatch(receivePost(results)))
);

export const createPost = formPost => dispatch => (
  postPost(formPost)
    .then(
      results => dispatch(receivePost(results))
    )
);

export const updatePost = (formPost, postId) => dispatch => (
  patchPost(formPost, postId)
    .then(
      results => dispatch(receivePost(results))
    )
);

export const removePost = postId => dispatch => (
  deletePost(postId).then(post => dispatch(removePostFromState(post)))
);

export const updateFilter = (filter, value) => (dispatch, getState) => {
  dispatch(receiveFilter(filter, value));
  return fetchPosts(getState().filters)(dispatch);
};