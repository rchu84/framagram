import React from 'react';
import { connect } from 'react-redux';
import { createPost, updatePost, removePost, fetchPost } from '../../actions/post_actions';
import PostForm from './post_form';

const mapStateToProps = (state, ownProps) => {
  const defaultPost = { caption: "", photoUrls: []};

  return {
    currentUserId: state.session.id,
    post: state.entities.posts[ownProps.match.params.postId] || defaultPost
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  submit: formPost => dispatch(updatePost(formPost, ownProps.match.params.postId)),
  fetchPost: postId => dispatch(fetchPost(postId)),
  deletePost: postId => dispatch(removePost(postId))
});

class EditPostForm extends React.Component {
  // this is the higher-order component made to handle the fetch

  componentDidMount() {
    // do my fetching here so that PostForm doesn't have to
    this.props.fetchPost(this.props.match.params.postId);
  }

  render() {
    // destructure the props so I can easily pass them down to PostForm
    const { post, submit, currentUserId, deletePost } = this.props;
    return <PostForm currentUserId={currentUserId} post={post} submit={submit} deletePost={deletePost} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPostForm);