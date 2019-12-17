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

export const getUser = filters => (
  $.ajax({
    method: 'GET',
    url: `api/users/${filters.username}`,
    data: { max_created_at: filters.maxCreatedAt }
  })
);

export const getFollowing = userId => (
  $.ajax({
    method: 'GET',
    url: `api/users/${userId}/following`,
    beforeSend: function (xhr) {   //Include the bearer token in header
      xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.token);
    }
  })
);

export const getFollowers = userId => (
  $.ajax({
    method: 'GET',
    url: `api/users/${userId}/followers`,
    beforeSend: function (xhr) {   //Include the bearer token in header
      xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.token);
    }
  })
);

export const getSearchUsers = query => (
  $.ajax({
    method: 'GET',
    url: 'api/users/search',
    dataType: 'json',
    data: { query }
  })
);