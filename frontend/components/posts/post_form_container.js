import { connect } from 'react-redux';
import { createPost } from '../../actions/post_actions';
import PostForm from './post_form';

const mapStateToProps = state => ({
  currentUserId: state.session.id
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createPost: formPost => dispatch(createPost(formPost))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);