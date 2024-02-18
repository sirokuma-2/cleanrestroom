Rails.application.routes.draw do
  root to: 'posts#top'
  resources :posts
end
