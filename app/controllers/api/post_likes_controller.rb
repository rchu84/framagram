class Api::PostLikesController < ApplicationController
  skip_before_action :authenticate_user, only: [:index]

  def index
    @post_likes = PostLike.includes(:user).where(post_id: params[:post_id])
  end

  def create
    @post_like = PostLike.new(post_like_params)
    if @post_like.save
      render :show
    else
      render json: @post_like.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @post_like = PostLike.find(params[:id])
    @post_like.destroy
    render json: @post_like
  end

  private

  def post_like_params
    params.require(:post_like).permit(:user_id, :post_id)
  end
end
