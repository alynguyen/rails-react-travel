class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.string :username, null: false
      t.string :location, null: false
      t.text :description, null: false
      t.string :lat, null: true
      t.string :lng, null: true
      t.string :reference, null: true
      t.string :place_id, null: true
      t.timestamps
    end
    # add_foreign_key :posts, :users, column: :user_id
  end
end
