class Api::PostsController < ApplicationController
  skip_before_action :authenticate_user, only: [:show]

  LIMIT = 5
  EXPLORE_LIMIT = 18

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
  
  def explore
    @posts = Post.includes(:author, :post_likes, :likers, :comments, :commenters)
      .limit(EXPLORE_LIMIT).order(Arel.sql('random()'))
      .where.not(id: params[:post_ids], author_id: current_user.id)
      .with_attached_photos
    render :index
  end

  def show
    @post = Post.includes(:author, :post_likes, :likers, :comments, :commenters)
      .with_attached_photos.find(params[:id])
  end

  def create
    unless params[:post].nil? || params[:post][:photos].nil?
      post_images = { photos: [] }
      params[:post][:photos].each do |photo|
        image = MiniMagick::Image.new(photo.tempfile.path) do |b|
          b.resize "640x640^"
          b.extent "640x640"
          b.gravity "center"
        end
        post_images[:photos] << image
      end
      post_params.merge!(post_images)
    end
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
