  # create_table "user_follows", force: :cascade do |t|
  #   t.integer "follower_id", null: false
  #   t.integer "following_id", null: false
  #   t.datetime "created_at", null: false
  #   t.datetime "updated_at", null: false
  #   t.index ["follower_id"], name: "index_user_follows_on_follower_id"
  #   t.index ["following_id", "follower_id"], name: "index_user_follows_on_following_id_and_follower_id", unique: true
  #   t.index ["following_id"], name: "index_user_follows_on_following_id"
  # end

require 'rails_helper'

RSpec.describe UserFollow, type: :model do
  subject(:user_follow) { build(:user_follow) }

  describe "validations" do
    it { should validate_presence_of(:follower_id) }
    it { should validate_presence_of(:following_id) }
    it { should validate_uniqueness_of(:follower_id).scoped_to(:following_id) }
  end

  describe "associations" do
    it { should belong_to(:follower) }
    it { should belong_to(:following) }
  end
end
