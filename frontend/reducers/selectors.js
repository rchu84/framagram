export const selectAllPosts = ({ entities }) => (
  Object.values(entities.posts)
    .filter(post => (post.author_id === getState().session.id) || 
      entities.users[getState().session.id].followingIds.includes(post.author_id))
    .sort((a, b) => (a.created_at > b.created_at)? -1 : 1)
);

export const selectPostsByUsername = (entities, username) => {
  const user = Object.values(entities.users).find(user => user.username == username);
  if (!user) {
    return [];
  } else {
    return Object.values(entities.posts)
      .filter(post => post.author_id === user.id)
      .sort((a, b) => (a.created_at > b.created_at) ? -1 : 1);
  }
};

export const selectUserByUsername = (entities, username) => (
  Object.values(entities.users).find(user => user.username == username)
);

export const userByPostId = (entities, postId) => {
  if (entities.posts[postId]) {
    return entities.users[entities.posts[postId].author_id]
  } else {
    return null;
  }
};

export const likersByPostId = (entities, postId) => (
  Object.values(entities.postLikes)
    .filter(postLike => postLike.post_id == postId)
    //.map(postLike => postLike.username)
);

export const commentsByPostId = (entities, postId) => (
  Object.values(entities.comments)
    .filter(comment => comment.post_id == postId)
);
