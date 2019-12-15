class Api::UserFollowsController < ApplicationController
  def followers
    @followers = User.find(params[:user_id]).followers
  end

  def following
    @following = User.find(params[:user_id]).following
  end

  def follow
    @user = User.find(params[:user_id])
    if current_user.follow @user.id
      render json: { follower_id: current_user.id, following_id: @user.id }
    else
      render json: @follow.errors.full_messages, status: :unprocessable_entity
    end
    
  end

  def unfollow
    @user = User.find(params[:user_id])
    if current_user.unfollow @user.id
      render json: { follower_id: current_user.id, following_id: @user.id }
    else
      render json: @follow.errors.full_messages, status: :unprocessable_entity
    end
  end

end
