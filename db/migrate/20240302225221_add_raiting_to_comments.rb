class AddRaitingToComments < ActiveRecord::Migration[7.0]
  def change
    add_column :comments, :raiting, :integer
  end
end
