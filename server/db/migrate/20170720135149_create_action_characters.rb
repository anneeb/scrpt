class CreateActionCharacters < ActiveRecord::Migration[5.1]
  def change
    create_table :action_characters do |t|
      t.references :character, foreign_key: true
      t.references :action, foreign_key: true

      t.timestamps
    end
  end
end
