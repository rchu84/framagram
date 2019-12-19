require 'rails_helper'

RSpec.describe Post, type: :model do
  # Validations
  # Associations
  # Class Methods
  # Error Messages

  subject(:post) { build(:post) }

  describe "validations" do
    it { should validate_presence_of(:author_id) }
    it { expect(post.photos).to be_attached }
  end

  describe "associatons" do
    it { should belong_to(:author) }
    it { should have_many(:comments) }
    it { should have_many(:commenters) }
    it { should have_many(:post_likes) }
    it { should have_many(:likers) }
  end
end
