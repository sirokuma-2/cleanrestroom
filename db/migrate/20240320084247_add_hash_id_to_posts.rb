class AddHashIdToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :hashId, :string
    add_index :posts, :hashId
  end
end
