class CreateDishes < ActiveRecord::Migration[8.0]
  def change
    create_table :dishes do |t|
      t.references :restaurant, null: false, foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
