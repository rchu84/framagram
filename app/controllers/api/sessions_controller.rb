class Api::SessionsController < Devise::SessionsController
  def create
    user = User.includes(:followers, :following).find_by_email(sign_in_params[:email])

    if user && user.valid_password?(sign_in_params[:password])
      @current_user = user
    else
      #render json: { errors: { 'email or password' => ['is invalid'] } }, status: :unprocessable_entity
      render json: ['Invalid credentials'], status: :unprocessable_entity
    end
  end

  def destroy
    sign_out(@current_user)
  end
end