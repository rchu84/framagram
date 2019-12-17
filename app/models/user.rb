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
                  followingIds: following.ids,
                  followerIds: followers.ids,
                  exp: 1.day.from_now.to_i },
                Rails.application.secrets.secret_key_base)
  end

  def follow(user_id)
    following_relationship.create(following_id: user_id)
  end

  def unfollow(user_id)
    following_relationship.find_by(following_id: user_id).destroy
  end

  def feed_posts(limit = nil, max_created_at = nil)
    @posts = Post
      .joins(:author)
      .joins('LEFT OUTER JOIN user_follows ON users.id = user_follows.following_id')
      .where('posts.author_id = :id OR user_follows.follower_id = :id', id: self.id)
      .order('posts.created_at DESC')
      .distinct
    
    @posts = @posts.limit(limit) unless limit.nil?
    @posts = @posts.where('posts.created_at < :max_created_at', max_created_at: max_created_at) unless max_created_at.nil?


    @posts
  end

end
