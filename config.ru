Bundler.require
Dotenv.load

require_relative 'app'

use Rack::Deflater
run MarkerApp
