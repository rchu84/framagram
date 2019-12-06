class Api::UsersController < ApplicationController
  before_action :authenticate_user!
  
  def show
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
