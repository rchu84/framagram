import {
  getComments,
  postComment,
  deleteComment
} from '../util/comment_api_util';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

const receiveComments = results => ({
  type: RECEIVE_COMMENTS,
  results
});

const receiveComment = results => ({
  type: RECEIVE_COMMENT,
  results
});

const removeCommentFromState = comment => ({
  type: REMOVE_COMMENT,
  comment
});

export const fetchComments = postId => dispatch => (
  getComments(postId).then(results => dispatch(receiveComments(results)))
);

export const createComment = formComment => dispatch => (
  postComment(formComment)
    .then(
      results => dispatch(receiveComment(results))
    )
);

export const removeComment = commentId => dispatch => (
  deleteComment(commentId).then(comment => dispatch(removeCommentFromState(comment)))
);