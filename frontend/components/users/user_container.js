import User from "./user";
import { connect } from "react-redux";

import { selectPostsByUsername, selectUserByUsername } from '../../reducers/selectors';
import { createPostLike, removePostLike, fetchPostLikes, removePost } from '../../actions/post_actions';
import { fetchPostsByUsername, followUser, unfollowUser, fetchFollowers, fetchFollowing } from '../../actions/user_actions';
import { createComment, removeComment } from '../../actions/comment_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUserId: state.session.id,
  posts: selectPostsByUsername(state.entities, ownProps.match.params.username),
  user: selectUserByUsername(state.entities, ownProps.match.params.username),
  users: state.entities.users,
  postLikes: state.entities.postLikes,
  comments: state.entities.comments,
  filters: ownProps.match.params.username
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: filters => dispatch(fetchPostsByUsername(filters)),
  removePost: postId => dispatch(removePost(postId)),
  createPostLike: formPostLike => dispatch(createPostLike(formPostLike)),
  removePostLike: postLikeId => dispatch(removePostLike(postLikeId)),
  fetchPostLikes: postId => dispatch(fetchPostLikes(postId)),
  createComment: formComment => dispatch(createComment(formComment)),
  removeComment: commentId => dispatch(removeComment(commentId)),
  followUser: userId => dispatch(followUser(userId)),
  unfollowUser: userId => dispatch(unfollowUser(userId)),
  fetchFollowers: userId => dispatch(fetchFollowers(userId)),
  fetchFollowing: userId => dispatch(fetchFollowing(userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);