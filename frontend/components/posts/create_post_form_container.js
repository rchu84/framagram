import { connect } from 'react-redux';
import { createPost, updatePost, removePost, fetchPost } from '../../actions/post_actions';
import PostForm from './post_form';

const mapStateToProps = (state, ownProps) => ({
  currentUserId: state.session.id,
  post: { caption: "", photoUrls: [] }
  // post: { caption: "", photos: [], photoUrls: [] }
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  submit: formPost => dispatch(createPost(formPost))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);