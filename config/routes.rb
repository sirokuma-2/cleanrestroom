Rails.application.routes.draw do
  devise_for :users
  root to: 'posts#top'
  resources :posts do
    resources :comments, only: [:new, :create]
  end
  resources :users, only: [:show, :edit, :update]
end
