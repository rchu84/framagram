import { 
  getPosts,
  getPostsExplore,
  postPost,
  getPost,
  patchPost,
  deletePost,
  getPostLikes,
  postPostLike,
  deletePostLike
} from '../util/post_api_util';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const REMOVE_POST = 'REMOVE_POST';

export const RECEIVE_POST_LIKES = 'RECEIVE_POST_LIKES';
export const RECEIVE_POST_LIKE = 'RECEIVE_POST_LIKE';
export const REMOVE_POST_LIKE = 'REMOVE_POST_LIKE';


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

const receivePostLikes = results => ({
  type: RECEIVE_POST_LIKES,
  results
});

const receivePostLike = results => ({
  type: RECEIVE_POST_LIKE,
  results
});

const removePostLikeFromState = postLike => ({
  type: REMOVE_POST_LIKE,
  postLike
});

export const fetchPostsExplore = filters => dispatch => (
  getPostsExplore(filters).then(results => dispatch(receivePosts(results)))
);


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

export const fetchPostLikes = postId => dispatch => (
  getPostLikes(postId).then(results => dispatch(receivePostLikes(results)))
);

export const createPostLike = formPostLike => dispatch => (
  postPostLike(formPostLike)
    .then(
      results => dispatch(receivePostLike(results))
    )
);

export const removePostLike = postLikeId => dispatch => (
  deletePostLike(postLikeId).then(postLike => dispatch(removePostLikeFromState(postLike)))
);