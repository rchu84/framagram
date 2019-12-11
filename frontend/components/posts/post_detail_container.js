import { connect } from 'react-redux';
import PostDetail from './post_detail';
import { fetchPost } from '../../actions/post_actions';
import { userByPostId } from '../../reducers/selectors';


const mapStateToProps = (state, ownProps) => ({
  post: state.entities.posts[ownProps.match.params.postId],
  author: userByPostId(state.entities, ownProps.match.params.postId)
});

const mapDispatchToProps = dispatch => ({
  fetchPost: postId => dispatch(fetchPost(postId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail);