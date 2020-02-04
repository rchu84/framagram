import PostIndex from "./post_index";
import { connect } from "react-redux";

import { selectAllPosts } from '../../reducers/selectors';
import { fetchPosts, fetchPost, createPostLike, removePostLike, fetchPostLikes, removePost } from '../../actions/post_actions';
import { createComment, removeComment } from '../../actions/comment_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUserId: state.session.id,
  posts: selectAllPosts(state),
  users: state.entities.users,
  postLikes: state.entities.postLikes,
  comments: state.entities.comments,
  filters: null
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: filters => dispatch(fetchPosts(filters)),
  fetchPost: postId => dispatch(fetchPost(postId)),
  removePost: postId => dispatch(removePost(postId)),
  updatePost: postId => dispatch(updatePost(postId)),
  createPostLike: formPostLike => dispatch(createPostLike(formPostLike)),
  removePostLike: postLikeId => dispatch(removePostLike(postLikeId)),
  fetchPostLikes: postId => dispatch(fetchPostLikes(postId)),
  createComment: formComment => dispatch(createComment(formComment)),
  removeComment: commentId => dispatch(removeComment(commentId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostIndex);