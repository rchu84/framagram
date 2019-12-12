class Api::PostsController < ApplicationController
  skip_before_action :authenticate_user, only: [:show]

  def index
    @posts = Post.includes(:author, :post_likes).with_attached_photos.where(author_id: current_user.id)
  end

  def show
    @post = Post.includes(:author, :post_likes).with_attached_photos.find(params[:id])
  end

  def create
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
