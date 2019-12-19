FactoryBot.define do
  factory :user do
    username { Faker::Internet.username }
    email    { Faker::Internet.safe_email }
    password { Faker::Internet.password(min_length: 6) }
  end
end
