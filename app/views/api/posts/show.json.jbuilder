json.posts do
  json.set! @post.id do
    json.partial! 'api/posts/post', post: @post
  end
end

json.users do
  json.set! @post.author_id do
    json.partial! 'api/users/user', user: @post.author
  end
end

json.post_likes do
  @post.post_likes.each do |post_like|
    json.set! post_like.id do
      json.extract! post_like, :id, :user_id, :post_id  
    end
  end
end

@post.comments.each do |comment|
  json.comments do
    json.set! comment.id do
      json.extract! comment, :id, :comment, :user_id, :post_id, :parent_comment_id
      json.username comment.user.username
    end
  end

  json.users do
    json.set! comment.user_id do
      json.partial! 'api/users/user', user: comment.user
    end
  end
end