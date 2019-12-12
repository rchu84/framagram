json.extract! post, :id, :caption, :author_id, :created_at, :updated_at
json.postLikes post.post_likes, :id, :user_id, :post_id
json.photoUrls post.photos.map { |file| url_for(file) }