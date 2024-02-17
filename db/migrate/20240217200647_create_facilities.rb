class CreateFacilities < ActiveRecord::Migration[7.0]
  def change
    create_table :facilities do |t|
      t.string :name, null: false
      t.string :address, null: false
      t.string :content, null: false
      t.float :latitude, null: false
      t.float :longitude, null: false
      t.timestamps
    end
  end
end
