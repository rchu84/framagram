require 'rails_helper'

RSpec.describe PostLike, type: :model do
  subject(:post_like) { build(:post_like) }

  describe "validations" do
    it { should validate_presence_of(:user_id) }
    it { should validate_presence_of(:post_id) }
    it { should validate_uniqueness_of(:user_id).scoped_to(:post_id) }
  end

  describe "associations" do
    it { should belong_to(:user) }
    it { should belong_to(:post) }
  end
end
