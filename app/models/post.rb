class Post < ApplicationRecord
  validates :author_id, presence: true
  validates_length_of :caption, maximum: 2200, allow_blank: true

  belongs_to :author,
    class_name: :User,
    foreign_key: :author_id

  has_many_attached :photos

  validates :photos, attached: true,
    content_type: ['image/png', 'image/jpg', 'image/jpeg'],
    limit: { min: 1, max: 10 }


  
end
