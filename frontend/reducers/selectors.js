export const selectAllPosts = ({ entities }) => (
  Object.values(entities.posts).sort((a, b) => (a.created_at > b.created_at)? -1 : 1)
)