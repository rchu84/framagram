require 'rails_helper'

#   Schema

#   create_table "users", force: :cascade do |t|
#     t.string "email", default: "", null: false
#     t.string "encrypted_password", default: "", null: false
#     t.string "reset_password_token"
#     t.datetime "reset_password_sent_at"
#     t.datetime "remember_created_at"
#     t.string "username", null: false
#     t.datetime "created_at", null: false
#     t.datetime "updated_at", null: false
#     t.index ["email"], name: "index_users_on_email", unique: true
#     t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
#     t.index ["username"], name: "index_users_on_username", unique: true
#   end

  # has_many :comments, dependent: :destroy
  # has_many :commented_posts, through: :comments, source: :post

  # has_many :post_likes, dependent: :destroy
  # has_many :liked_posts, through: :post_likes, source: :post

  # has_many :follower_relationships, foreign_key: :following_id, class_name: :UserFollow
  # has_many :followers, through: :follower_relationships, source: :follower

  # has_many :following_relationship, foreign_key: :follower_id, class_name: :UserFollow
  # has_many :following, through: :following_relationship, source: :following


RSpec.describe User, type: :model do
  subject(:user) { build(:user) }

  describe "validation" do
    it { should validate_presence_of(:username) }
    it { should validate_uniqueness_of(:username) }
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email).case_insensitive }
    it { should validate_length_of(:password).is_at_least(6) }
  end

  describe "associations" do
    it { should have_many(:posts) }
    it { should have_many(:comments) }
    it { should have_many(:commented_posts) }
  end

end
