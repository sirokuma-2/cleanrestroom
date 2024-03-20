Rails.application.routes.draw do
  devise_for :users
  root to: 'posts#index'
  get 'about', to: 'posts#about'
  resources :posts, param: :hashed_id do
    resources :comments, only: [:new, :create]
  end
  resources :users, only: [:show, :edit, :update], param: :name
end
