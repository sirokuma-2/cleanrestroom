Rails.application.routes.draw do
  devise_for :users
  root 'posts#index'
  get 'about', to: 'posts#about'
  get 'termsofuse', to: 'posts#termsofuse'
  get 'privacypolicy', to: 'posts#privacypolicy'
  resources :posts, param: :hashed_id do
    resources :comments, only: [:new, :create]
  end
  resources :users, only: [:show, :edit, :update], param: :name
end
