class CreateRoutes < ActiveRecord::Migration
  def change
    execute "CREATE EXTENSION IF NOT EXISTS postgis;"
    create_table :routes do |t|
      t.string :name
      t.text :description
      t.line_string :path

      t.timestamps
    end
  end
end
