Rails.application.routes.draw do
  devise_for :users
  root to: 'posts#top'
  resources :posts
  resources :users, only: [:show, :edit, :update]
end
