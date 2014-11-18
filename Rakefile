Bundler.require
Dotenv.load

begin
  require 'jshintrb/jshinttask'
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
  Jshintrb::JshintTask.new :jshint do |t|
    t.pattern = 'assets/javascripts/**/*.js'
    t.exclude_pattern = 'assets/javascripts/vendor/**/*.js'
    t.options = {
      :bitwise => true,
      :curly => true,
      :eqeqeq => true,
      :forin => true,
      :immed => true,
      :latedef => true,
      :newcap => true,
      :noarg => true,
      :noempty => true,
      :nonew => true,
      :plusplus => true,
      predef: ['angular', 'google'],
      :regexp => true,
      :undef => true,
      :strict => true,
      :trailing => true,
      :browser => true
    }
  end
rescue LoadError
  puts 'Jasmine and JSHint were not loaded'
end

require 'sinatra/asset_pipeline/task'
require 'sinatra/activerecord/rake'
require_relative 'app'

Sinatra::AssetPipeline::Task.define! MarkerApp
