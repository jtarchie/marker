Bundler.require

require 'sinatra/asset_pipeline'
require 'sinatra/reloader'

Dotenv.load if defined?(Dotenv)

class App < Sinatra::Base
  register Sinatra::AssetPipeline

  configure :development do
    register Sinatra::Reloader
  end

  get '/' do
    haml :index
  end
end

run App
