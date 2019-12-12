class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :username, presence: true, uniqueness: true

  has_many :posts, dependent: :delete_all,
    foreign_key: :author_id

  has_many :comments, dependent: :destroy
  has_many :commented_posts, through: :comments, source: :post

  has_many :post_likes, dependent: :destroy
  has_many :liked_posts, through: :post_likes, source: :post

  has_many :follower_relationships, foreign_key: :following_id, class_name: :UserFollow
  has_many :followers, through: :follower_relationships, source: :follower

  has_many :following_relationship, foreign_key: :follower_id, class_name: :UserFollow
  has_many :following, through: :following_relationship, source: :following

  def generate_jwt
    JWT.encode({  id: id,
                  email: email,
                  username: username,
                  exp: 1.day.from_now.to_i },
                Rails.application.secrets.secret_key_base)
  end

  def follow(user_id)
    following_relationship.create(following_id: user_id)
  end

  def unfollow(user_id)
    following_relationship.find_by(following_id: user_id).destroy
  end

end
