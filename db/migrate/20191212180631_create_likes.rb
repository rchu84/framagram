class CreateLikes < ActiveRecord::Migration[5.2]
  def change
    create_table :post_likes do |t|
      t.integer :user_id, null: false
      t.integer :post_id, null: false

      t.timestamps
    end
    add_index :post_likes, [:user_id, :post_id], unique: true
  end
end
