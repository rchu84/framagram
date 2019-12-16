class Api::UsersController < ApplicationController
  #before_action :authenticate_user!
  skip_before_action :authenticate_user, only: [:show]

  def show
    user = User.find_by(username: params[:username])
    @posts = Post.includes(:author, :post_likes, :likers, :comments, :commenters)
      .with_attached_photos.where(author_id: user.id)
    render template: "api/posts/index"
  end

  def update
    if current_user.update_attributes(user_params)
      render :show
    else
      render json: { errors: current_users.errors }, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :email)
  end
end
