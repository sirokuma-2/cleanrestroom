Rails.application.routes.draw do
  devise_for :users, controllers: {
    passwords: 'public/passwords'
  }
  root to: 'posts#top'
  resources :posts
  resources :users, only: [:show, :edit, :update]
end
