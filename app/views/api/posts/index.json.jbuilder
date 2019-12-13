@posts.each do |post|
  json.posts do
    json.set! post.id do
      json.partial! 'api/posts/post', post: post
    end
  end

  json.users do
    json.set! post.author_id do
      json.partial! 'api/users/user', user: post.author
    end
  end

  json.post_likes do
    post.post_likes.each do |post_like|
      json.set! post_like.id do
        json.extract! post_like, :id, :user_id, :post_id  
      end
    end
  end

  #json.postLikes post.post_likes, :id, :user_id, :post_id

end