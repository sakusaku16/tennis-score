Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  
  namespace :api do
    get 'score', to: 'scores#show'
    post 'score', to: 'scores#update'
  end
end
