Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'posts/index', to: 'post#index'
      post 'posts/create', to: 'post#create'
      get '/show/:id', to: 'post#show'
      delete 'destroy/:id', to: 'post#destroy'
    end
  end
  root 'homepage#index'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'
  get '/*path' => 'homepage#index'
  resources :users, only: [:create, :show, :index]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
