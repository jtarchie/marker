# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

begin
  require 'jshintrb/jshinttask'
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
rescue LoadError
  puts 'Jasmine and JSHint were not loaded'
end

Rails.application.load_tasks

task default: ["jasmine:ci"]
