json.extract! post, :id, :caption, :author_id, :created_at, :updated_at
json.postLikes post.post_likes, :id
json.comments post.comments, :id
json.photoUrls post.photos.map { |file| file.variant(combine_options: {resize: "640x640^", extent: "640x640", gravity: "center"}).processed.service_url }
#file.variant(resize: "640x640^").processed.service_url