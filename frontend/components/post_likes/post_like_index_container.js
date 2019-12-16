import { connect } from 'react-redux';
import PostLikeIndex from './post_like_index';
import { fetchPostLikes, fetchPosts } from '../../actions/post_actions';
import { likersByPostId } from '../../reducers/selectors';
import { followUser, unfollowUser } from '../../actions/user_actions';


const mapStateToProps = (state, ownProps) => ({
  likers: likersByPostId(state.entities, ownProps.postId),
  followingIds: state.session.id ? state.entities.users[state.session.id].followingIds : [],
  currentUserId: state.session.id
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchPosts: () => dispatch(fetchPosts()),
  fetchPostLikes: () => dispatch(fetchPostLikes(ownProps.postId)),
  followUser: userId => dispatch(followUser(userId)),
  unfollowUser: userId => dispatch(unfollowUser(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostLikeIndex);