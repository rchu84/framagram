class Post < ApplicationRecord
  validates :author_id, presence: true
  validates_length_of :caption, maximum: 2200, allow_blank: true

  belongs_to :author, -> { includes :following, :followers },
    class_name: :User,
    foreign_key: :author_id

  has_many :post_likes, dependent: :destroy
  has_many :likers, -> { includes :following, :followers }, through: :post_likes, source: :user

  has_many :comments, dependent: :destroy
  has_many :commenters, -> { includes :following, :followers }, through: :comments, source: :user

  has_many_attached :photos

  validates :photos, attached: true,
    content_type: ['image/png', 'image/jpg', 'image/jpeg'],
    limit: { min: 1, max: 10 }

  def self.by_username(username)
    @posts = Post.joins(:author).where('users.username = :username', username: username)
  end
  
end
