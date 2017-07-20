class CreateScenes < ActiveRecord::Migration[5.1]
  def change
    create_table :scenes do |t|
      t.references :act, foreign_key: true
      t.string :title
      t.integer :index

      t.timestamps
    end
  end
end
