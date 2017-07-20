class CreateActs < ActiveRecord::Migration[5.1]
  def change
    create_table :acts do |t|
      t.references :version, foreign_key: true
      t.string :title
      t.integer :index

      t.timestamps
    end
  end
end
