@post_likes.each do |post_like|
  json.post_likes do
    json.set! post_like.id do
      json.partial! 'api/post_likes/post_like', post_like: post_like
    end
  end

  json.users do
    json.set! post_like.user_id do
      json.partial! 'api/users/user', user: post_like.user
    end
  end
end