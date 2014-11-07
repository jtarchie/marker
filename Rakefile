require "jshintrb/jshinttask"
require 'jasmine'
require 'sinatra/asset_pipeline/task'
require_relative 'app'

Jshintrb::JshintTask.new :jshint do |t|
  t.pattern = 'assets/javascripts/**/*.js'
  t.options = :defaults
end

Sinatra::AssetPipeline::Task.define! App

load 'jasmine/tasks/jasmine.rake'
