require 'sinatra/asset_pipeline'
require 'sinatra/reloader'

class App < Sinatra::Base
  register Sinatra::AssetPipeline

  configure :development do
    register Sinatra::Reloader
  end

  get '/' do
    haml :index
  end
end
