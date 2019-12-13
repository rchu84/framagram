import PostIndex from "./post_index";
import { connect } from "react-redux";

import { selectAllPosts } from '../../reducers/selectors';
import { fetchPosts, createPostLike, removePostLike, fetchPostLikes } from '../../actions/post_actions';

const mapStateToProps = state => ({
  currentUserId: state.session.id,
  posts: selectAllPosts(state),
  users: state.entities.users,
  postLikes: state.entities.postLikes
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts()),
  createPostLike: formPostLike => dispatch(createPostLike(formPostLike)),
  removePostLike: postLikeId => dispatch(removePostLike(postLikeId)),
  fetchPostLikes: postId => dispatch(fetchPostLikes(postId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostIndex);