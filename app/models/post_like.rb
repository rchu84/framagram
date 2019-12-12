class PostLike < ApplicationRecord
  validates :user_id, :post_id, presence: true
  validates_uniqueness_of :user_id, scope: :post_id

  belongs_to :user
  belongs_to :post
end
