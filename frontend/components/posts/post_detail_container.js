import { connect } from 'react-redux';
import PostIndexItem from './post_index_item';
import { fetchPost } from '../../actions/post_actions';
import { userByPostId, likersByPostId, commentsByPostId } from '../../reducers/selectors';


const mapStateToProps = (state, ownProps) => ({
  currentUserId: state.session.id,
  post: state.entities.posts[ownProps.match.params.postId],
  author: userByPostId(state.entities, ownProps.match.params.postId),
  postLikes: likersByPostId(state.entities, ownProps.match.params.postId),
  comments: commentsByPostId(state.entities, ownProps.match.params.postId),
  filters: ownProps.match.params.postId
});

const mapDispatchToProps = dispatch => ({
  fetchPost: postId => dispatch(fetchPost(postId)),
  createPostLike: formPostLike => dispatch(createPostLike(formPostLike)),
  removePostLike: postLikeId => dispatch(removePostLike(postLikeId)),
  fetchPostLikes: postId => dispatch(fetchPostLikes(postId)),
  createComment: formComment => dispatch(createComment(formComment)),
  removeComment: commentId => dispatch(removeComment(commentId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostIndexItem);
