Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  scope :api, defaults: { format: :json } do
    devise_for :users,  controllers: {
                          sessions: 'api/sessions'
                        },
                        path_names: {
                          sign_in: :login,
                          sign_out: :logout
                        }
  end

  namespace :api, defaults: { format: :json } do
    get 'users/:username', to: 'users#show'
    resources :users, only: [:show, :index, :update] do
      get '/followers', to: 'user_follows#followers'
      get '/following', to: 'user_follows#following'
      post '/follow', to: 'user_follows#follow'
      post '/unfollow', to: 'user_follows#unfollow'
      get 'search', on: :collection
    end

    resources :posts, only: [:show, :index, :update, :destroy, :create] do
      resources :post_likes, only: [:index]
      resources :comments, only: [:index]
    end
    resources :comments, only: [:create, :destroy]
    resources :post_likes, only: [:create, :destroy]
  end
end
