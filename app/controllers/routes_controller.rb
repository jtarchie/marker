class RoutesController < ApplicationController
  def create
    geo_json = RGeo::GeoJSON.decode(request.body.read.to_s, json_parser: :json)
    feature = geo_json.first
    route = Route.create!(
      path: feature.geometry,
      name: feature.properties['name'],
      description: feature.properties['description']
    )

    geojson_route(route)
  end

  def show
    route = Route.find(params[:id])
    geojson_route(route)
  end

  private

  def geojson_route(route)
    entity_factory = RGeo::GeoJSON::EntityFactory.instance
    render json: RGeo::GeoJSON.encode(
      entity_factory.feature_collection(
        [
          entity_factory.feature(route.path, route.id, {
            name: route.name,
            description: route.description
          })
        ]
      )
    )
  end
end
