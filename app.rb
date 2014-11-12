require 'sinatra/activerecord'
require 'sinatra/asset_pipeline'
require 'sinatra/reloader'

class Route < ActiveRecord::Base; end

class MarkerApp < Sinatra::Base
  register Sinatra::AssetPipeline
  register Sinatra::ActiveRecordExtension

  configure :development do
    register Sinatra::Reloader
  end

  helpers do
    def geojson_route(route)
      content_type :json

      entity_factory = RGeo::GeoJSON::EntityFactory.instance
      RGeo::GeoJSON.encode(
        entity_factory.feature_collection(
          [
            entity_factory.feature(route.path, route.id, {
              name: route.name,
              description: route.description
            })
          ]
        )
      ).to_json
    end
  end

  get '/' do
    haml :index
  end

  post '/routes' do
    geo_json = RGeo::GeoJSON.decode(request.body.read.to_s, json_parser: :json)
    feature = geo_json.first
    route = Route.create!(
      path: feature.geometry,
      name: feature.properties['name'],
      description: feature.properties['description']
    )

    geojson_route(route)
  end

  get '/routes/:id' do |id|
    route = Route.find(id)
    geojson_route(route)
  end
end
