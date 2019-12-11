export const getPosts = filters => (
  $.ajax({
    method: 'GET',
    url: 'api/posts',
    data: filters,
    dataType: 'json',
    beforeSend: function (xhr) {   //Include the bearer token in header
      xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.token);
    },
    error: (err) => console.log(err)
  })
);

export const getPost = postId => (
  $.ajax({
    method: 'GET',
    url: `api/posts/${postId}`,
    error: (err) => console.log(err)
  })
);

export const postPost = post => (
  $.ajax({
    method: 'POST',
    url: 'api/posts',
    //data: { post }
    data: post,
    contentType: false,
    processData: false,
    beforeSend: function (xhr) {   //Include the bearer token in header
      xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.token);
    }
  })
);

export const patchPost = (post, postId) => (
  $.ajax({
    method: 'PATCH',
    url: `api/posts/${postId}`,
    data: post,
    contentType: false,
    processData: false,
    beforeSend: function (xhr) {   //Include the bearer token in header
      xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.token);
    }
  })
);

export const deletePost = postId => (
  $.ajax({
    method: 'DELETE',
    url: `api/posts/${postId}`,
    beforeSend: function (xhr) {   //Include the bearer token in header
      xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.token);
    }
  })
);