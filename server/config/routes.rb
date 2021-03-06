Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      resources :scripts, only: [:create, :show]
      resources :versions, only: [:create]
      post '/auth', to: 'auth#create'
      get '/me', to: 'auth#show'
    end
  end

end
