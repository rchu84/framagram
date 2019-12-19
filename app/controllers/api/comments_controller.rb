class Api::CommentsController < ApplicationController
  skip_before_action :authenticate_user, only: [:index]

  def index
    @comments = Comment.includes(:user).where(post_id: params[:post_id])
  end

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    render json: @comment
  end

  private

  def comment_params
    params.require(:comment).permit(:user_id, :post_id, :comment, :parent_comment_id)
  end
end
