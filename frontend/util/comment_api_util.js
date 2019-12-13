export const getComments = postId => (
  $.ajax({
    method: 'GET',
    url: `api/posts/${postId}/comments`
  })
);

export const postComment = comment => (
  $.ajax({
    method: 'POST',
    url: 'api/comments',
    data: { comment },
    beforeSend: function (xhr) {   //Include the bearer token in header
      xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.token);
    }
  })
);

export const deleteComment = commentId => (
  $.ajax({
    method: 'DELETE',
    url: `api/comments/${commentId}`,
    beforeSend: function (xhr) {   //Include the bearer token in header
      xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.token);
    }
  })
);