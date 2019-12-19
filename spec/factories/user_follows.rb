FactoryBot.define do
  factory :user_follow do
    following_id { 2 }
    follower_id { 1 }
  end
end
