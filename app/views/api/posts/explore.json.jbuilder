@posts.each do |post|
  json.posts do
    json.set! post.id do
      json.extract! post, :id, :caption, :author_id, :created_at, :updated_at
      json.photoUrls post.photos.map { |file| url_for(file) }
    end
  end
end