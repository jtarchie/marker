Bundler.require
Dotenv.load

require 'pry'
require 'jshintrb/jshinttask'
require 'jasmine'
require 'sinatra/asset_pipeline/task'
require 'sinatra/activerecord/rake'
require_relative 'app'

Jshintrb::JshintTask.new :jshint do |t|
  t.pattern = 'assets/javascripts/**/*.js'
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

Sinatra::AssetPipeline::Task.define! App

load 'jasmine/tasks/jasmine.rake'
