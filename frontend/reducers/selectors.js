export const selectAllPosts = ({ entities }) => (
  Object.values(entities.posts).sort((a, b) => (a.created_at > b.created_at)? -1 : 1)
)

export const userByPostId = (entities, postId) => {
  if (entities.posts[postId]) {
    return entities.users[entities.posts[postId].author_id]
  } else {
    return null;
  }
};

export const likersByPostId = (entities, postId) => (
  Object.values(entities.postLikes)
    .filter(postLike => postLike.post_id === postId)
    .map(postLike => postLike.username)
);