class CreateActions < ActiveRecord::Migration[5.1]
  def change
    create_table :actions do |t|
      t.references :scene, foreign_key: true
      t.string :type
      t.text :body
      t.integer :index

      t.timestamps
    end
  end
end
