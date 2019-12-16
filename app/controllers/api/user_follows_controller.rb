class Api::UserFollowsController < ApplicationController
  def followers
    @users = User.includes(following: [:following, :followers], followers: [:following, :followers])
      .find(params[:user_id]).followers
    render template: "api/user_follows/users"
  end

  def following
    @users = User.includes(following: [:following, :followers], followers: [:following, :followers])
      .find(params[:user_id]).following
    render template: "api/user_follows/users"
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
