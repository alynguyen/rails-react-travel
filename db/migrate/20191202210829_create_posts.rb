class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.references :user, index: true
      t.text :location, null: false
      t.text :description, null: false
      t.timestamps
    end
    add_foreign_key :posts, :users, column: :user_id
  end
end
