require 'sinatra/activerecord'
require 'sinatra/asset_pipeline'
require 'sinatra/reloader'
require 'pry'

class Route < ActiveRecord::Base; end

class App < Sinatra::Base
  register Sinatra::AssetPipeline
  register Sinatra::ActiveRecordExtension

  configure :development do
    register Sinatra::Reloader
  end

  helpers do
    def parsed_json
      @parsed_json ||= JSON.parse(response.body)
    end
  end

  get '/' do
    haml :index
  end

  post '/routes' do
    geo_json = RGeo::GeoJSON.decode(request.body.read.to_s, json_parser: :json)
    route = Route.create!(
      path: geo_json.first.geometry
    )
    route.to_json
  end
end
