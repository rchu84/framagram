FactoryBot.define do
  factory :post do
    caption { "MyString" }
    author_id { 1 }
    after(:build) do |post|
      post.photos.attach(io: File.open(Rails.root.join('spec', 'factories', 'images', 'instagram.jpg')), filename: 'instagram1.jpg')
    end
  end
end
