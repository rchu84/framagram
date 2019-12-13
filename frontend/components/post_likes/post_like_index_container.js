import { connect } from 'react-redux';
import PostLikeIndex from './post_like_index';
import { fetchPostLikes } from '../../actions/post_actions';
import { likersByPostId } from '../../reducers/selectors';


const mapStateToProps = (state, ownProps) => ({
  likers: likersByPostId(state.entities, ownProps.postId)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchPostLikes: () => dispatch(fetchPostLikes(ownProps.postId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostLikeIndex);