class AddFacilitiesToFacility < ActiveRecord::Migration[7.0]
  def change
    add_column :facilities, :nursing_room, :boolean
    add_column :facilities, :anyone_toilet, :boolean
    add_column :facilities, :diaper_changing_station, :boolean
    add_column :facilities, :powder_corner, :boolean
    add_column :facilities, :stroller_accessible, :boolean
  end
end
