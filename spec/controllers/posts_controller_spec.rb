require 'rails_helper'
require 'spec_helper'

RSpec.describe Api::PostsController, type: :controller do
  let(:user) { create(:user) }

  describe "POST #create" do
    before(:each) do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      sign_in user
    end

    context "with invalid params" do
      it "validates the presence of input field" do
        post :create, params: { post: { caption: nil, author_id: nil } }
        expect(response).to have_http_status(422)
      end
    end

    context "with valid params" do
      #subject(:test_post) { build(:post) }

      it "renders show template on success" do
        post :create, params: { post: { caption: "", author_id: user.id, photos: [fixture_file_upload('files/instagram.jpg', 'image/jpg')] } }, format: :json
        expect(response).to render_template(:show)
      end
    end
  end

  let(:test_post) { create(:post, author_id: user.id) }

  describe "GET #show" do

    before(:each) do  
      sign_in user
    end

    it "returns http success and correct template" do
      Post.create!(caption: "goal 1", author_id: user.id, photos: [fixture_file_upload('files/instagram.jpg', 'image/jpg')])
      get :show, params: { id: Post.last.id }, format: :json
      expect(response).to have_http_status(200)
      expect(response).to render_template(:show)
    end
  end

  describe "PATCH #update" do
    context "with invalid params" do
      it "validates the presence of input field" do
        sign_in user
        patch :update, params: { id: test_post.id, post: { author_id: test_post.author_id, photos: [] } }, format: :json
        expect(response).to have_http_status(422)
      end
    end

    context "with valid params" do
      it "renders show template on success" do
        sign_in user
        patch :update, params: { id: test_post.id, post: { caption: "updated caption", author_id: test_post.author_id, photos: [fixture_file_upload('files/instagram.jpg', 'image/jpg')] } }, format: :json
        expect(response).to have_http_status(200)
        expect(response).to render_template(:show)
      end
    end
  end

  describe "DELETE #destroy" do
    context "with valid id" do
      it "destroys the post successfully and returns the post JSON" do
        sign_in user
        delete :destroy, params: { id: test_post.id }, format: :json
        expect(response.body).to eq(test_post.to_json)
      end
    end
  end

end
