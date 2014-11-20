Rails.application.routes.draw do
  get "/" => "home#show"
  resources :routes, only: [:create, :show]
end
