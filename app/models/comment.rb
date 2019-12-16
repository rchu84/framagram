class Comment < ApplicationRecord
  validates :comment, :user_id, :post_id, presence: true

  belongs_to :user, -> { includes :following, :followers }
  belongs_to :post
  belongs_to :parent_comment, optional: true,
    foreign_key: :parent_comment_id,
    class_name: :Comment
end
