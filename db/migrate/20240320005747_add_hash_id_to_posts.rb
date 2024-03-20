class AddHashIdToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :hash_id, :string
    add_index :posts, :hash_id
  end
end
