import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import postsReducer from './posts_reducer';
import postLikesReducer from './post_likes_reducer';

const entitiesReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
  postLikes: postLikesReducer
});

export default entitiesReducer;