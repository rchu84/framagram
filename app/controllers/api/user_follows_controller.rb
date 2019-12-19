class Api::UserFollowsController < ApplicationController
  def followers
    @users = User.includes(following: [:following, :followers], followers: [:following, :followers])
      .find(params[:id]).followers
    render template: "api/user_follows/users"
  end

  def following
    @users = User.includes(following: [:following, :followers], followers: [:following, :followers])
      .find(params[:id]).following
    render template: "api/user_follows/users"
  end

  def follow
    @user = User.find_by(id: params[:user_id])
    if @user.nil?
      render json: ['Invalid user to follow'], status: :unprocessable_entity and return
    end
    if current_user.follow @user.id
      render json: { follower_id: current_user.id, following_id: @user.id }
    else
      render json: @follow.errors.full_messages, status: :unprocessable_entity
    end
    
  end

  def unfollow
    @user = User.find_by(id: params[:user_id])
    if @user.nil?
      render json: ['Invalid user to follow'], status: :unprocessable_entity and return
    end
    unless current_user.unfollow(@user.id).nil?
      render json: { follower_id: current_user.id, following_id: @user.id }
    else
      render json: ['Invalid user to unfollow'], status: :unprocessable_entity
    end
  end

end
