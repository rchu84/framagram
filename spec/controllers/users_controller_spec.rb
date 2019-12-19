require 'rails_helper'

RSpec.describe Api::Users::RegistrationsController, type: :controller do

  describe "POST #create" do
    context "with invalid params" do
      it "validates the presence of username, email, and password" do
        @request.env["devise.mapping"] = Devise.mappings[:user]
        post :create, params: { user: { username: nil, email: nil, password: nil } }
        expect(response).to have_http_status(422)
      end

      it "validates that the password is at least 6 characters long" do
        @request.env["devise.mapping"] = Devise.mappings[:user]
        post :create, params: { user: { username: "test", email: "test@example.org", password: "" } }
        expect(response).to have_http_status(422)
      end
    end

    context "with valid params" do
      it "renders user json" do
        @request.env["devise.mapping"] = Devise.mappings[:user]
        post :create, params: { user: { username: "test", email: "test@example.org", password: "123456" } }, format: :json
        expect(response).to render_template("devise/registrations/create")
      end
    end
  end

  # describe "GET #show" do
  #   let(:user) { create(:user) }

  #   before(:each) do  
  #     sign_in user
  #   end

  #   it "renders the user page after sign up or login" do
  #     #User.create!(username: "test123", password: "123456")
  #     get :show, params: { id: user.id }
  #     expect(response).to have_http_status(200)
  #     expect(response).to render_template(:show)
  #   end
  # end

end
