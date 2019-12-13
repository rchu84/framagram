json.post_likes do
  json.set! @post_like.id do
    json.partial! 'api/post_likes/post_like', post_like: @post_like
  end
end
