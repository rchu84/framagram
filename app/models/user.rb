class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :username, presence: true, uniqueness: true

  def generate_jwt
    JWT.encode({  id: id,
                  email: email,
                  username: username,
                  exp: 1.day.from_now.to_i },
                Rails.application.secrets.secret_key_base)
  end
end
