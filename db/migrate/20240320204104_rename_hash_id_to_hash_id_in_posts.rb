class RenameHashIdToHashIdInPosts < ActiveRecord::Migration[7.0]
  def change
    rename_column :posts, :hashId, :hash_id
  end
end
