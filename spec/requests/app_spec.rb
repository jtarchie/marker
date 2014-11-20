require 'rails_helper'

describe 'When makeing API requests' do
  def json_response
    @json ||= JSON.parse(response.body)
  end

  let(:payload) do
    {
      "type" => "FeatureCollection",
      "features"=>[{
        "type"=>"Feature",
        "geometry"=> {
          "type"=>"LineString",
          "coordinates"=>[
            [-73.9541244506836,40.721892375167045],
            [-73.95411,40.721900000000005],
            [-73.95365000000001,40.72162]
          ]
        },
        "properties"=>{
          name: 'Name',
          description: 'Description'
        }
      }]
    }
  end

  context 'GET /' do
    it 'returns a successful HTML response' do
      get '/'
      expect(response).to be_ok
      expect(response.content_type.to_s).to eq 'text/html'
    end
  end

  context 'POST /routes' do
    let(:json_payload) { payload.to_json }

    it 'creates a route in the database' do
      expect {
        post '/routes', json_payload, {'Content-Type' => 'application/json'}
      }.to change { Route.count }.by(1)
    end

    it 'returns a successful response' do
      post '/routes', json_payload, {'Content-Type' => 'application/json'}
      expect(response.content_type).to eq 'application/json'
      expect(response).to be_ok
    end

    it 'returns a GeoJSON response of the route' do
      post '/routes', json_payload, {'Content-Type' => 'application/json'}
      expect(response.content_type).to eq 'application/json'
      feature = json_response['features'][0]
      expect(feature['geometry']['coordinates']).to eq payload['features'][0]['geometry']['coordinates']
      expect(feature['id']).to be_kind_of(Fixnum)
      expect(feature['properties']['name']).to eq 'Name'
      expect(feature['properties']['description']).to eq 'Description'
    end
  end

  context 'GET /routes/:id' do
    let!(:route) do
      Route.create(
        name: 'Name',
        description: 'Description',
        path: 'LINESTRING(
                -73.9541244506836 40.721892375167045 ,
                -73.95411 40.721900000000005 ,
                -73.95365000000001 40.72162
               )'
      )
    end

    it 'returns a successful response' do
      get "/routes/#{route.id}", {}, {"Accept" => "application/json"}
      expect(response.content_type).to eq 'application/json'
      expect(response).to be_ok
    end

    it 'returns a GeoJSON response of the route' do
      get "/routes/#{route.id}", {}, {"Accept" => "application/json"}
      feature = json_response['features'][0]
      expect(feature['geometry']['coordinates']).to eq payload['features'][0]['geometry']['coordinates']
      expect(feature['id']).to eq route.id
      expect(feature['properties']['name']).to eq 'Name'
      expect(feature['properties']['description']).to eq 'Description'
    end
  end
end
