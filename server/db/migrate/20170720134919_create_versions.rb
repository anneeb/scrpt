class CreateVersions < ActiveRecord::Migration[5.1]
  def change
    create_table :versions do |t|
      t.references :script, foreign_key: true
      t.text :editorState

      t.timestamps
    end
  end
end
