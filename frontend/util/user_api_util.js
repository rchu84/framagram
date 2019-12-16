export const postFollow = userId => (
  $.ajax({
    method: 'POST',
    url: `api/users/${userId}/follow`,
    beforeSend: function (xhr) {   //Include the bearer token in header
      xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.token);
    }
  })
);

export const postUnfollow = userId => (
  $.ajax({
    method: 'POST',
    url: `api/users/${userId}/unfollow`,
    beforeSend: function (xhr) {   //Include the bearer token in header
      xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.token);
    }
  })
);

export const getUser = username => (
  $.ajax({
    method: 'GET',
    url: `api/users/${username}`
  })
);