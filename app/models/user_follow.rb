class UserFollow < ApplicationRecord
  validates :follower_id, :following_id, presence: true
  validates_uniqueness_of :follower_id, scope: :following_id

  belongs_to :follower, foreign_key: :follower_id, class_name: :User
  belongs_to :following, foreign_key: :following_id, class_name: :User
end
