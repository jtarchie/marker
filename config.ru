Bundler.require

require_relative 'app'

Dotenv.load if defined?(Dotenv)


run App
