class Api::PostsController < ApplicationController
  skip_before_action :authenticate_user, only: [:show]

  LIMIT = 5

  def index
    followingIds = current_user.following.ids
    followingIds << current_user.id
    @posts = Post.includes(:author, :post_likes, :likers, :comments, :commenters)
      .with_attached_photos
      .where(author_id: followingIds)
      .limit(LIMIT)
      .order(created_at: :desc)
    
    @posts = @posts.where('posts.created_at < :max_created_at', max_created_at: params[:max_created_at]) if params[:max_created_at].present?

  end

  def show
    @post = Post.includes(:author, :post_likes, :likers, :comments, :commenters)
      .with_attached_photos.find(params[:id])
  end

  def create
    post_images = { photos: [] }
    p params[:post][:photos].count
    params[:post][:photos].each_with_index do |photo, i|
      image = MiniMagick::Image.new(photo.tempfile.path) do |b|
        #json.photoUrls post.photos.map { |file| file.variant(combine_options: {resize: "640x640^", extent: "640x640", gravity: "center"}).processed.service_url }
        #file.variant(resize: "640x640^").processed.service_url
        b.resize "640x640^"
        b.extent "640x640"
        b.gravity "center"
      end
      post_images[:photos] << image
    end
    p post_images
    post_params.merge!(post_images)
    @post = Post.new(post_params)
    if @post.save
      render :show
    else
      render json: @post.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @post = Post.with_attached_photos.find(params[:id])
    @post.photos.purge
    if @post.update(post_params)
      render :show
    else
      render json: @post.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    render json: @post
  end

  private

  def post_params
    params.require(:post).permit(:caption, :author_id, photos: [])
  end

end
