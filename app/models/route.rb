class Route
  include Elasticsearch::Persistence::Model

  attribute :name, String
  attribute :description, String
  attribute :path, nil, type: 'geo_shape'
end
