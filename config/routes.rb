Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  scope :api, defaults: { format: :json } do
    devise_for :users,  controllers: {
                          sessions: 'api/sessions'                        },
                        path_names: {
                          sign_in: :login,
                          sign_out: :logout
                        }
  end

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :index, :update]
    resources :posts, only: [:show, :index, :update, :destroy, :create]
  end
end
