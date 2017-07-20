class CreateEditorVersions < ActiveRecord::Migration[5.1]
  def change
    create_table :editor_versions do |t|
      t.references :version, foreign_key: true
      t.references :editor, foreign_key: true

      t.timestamps
    end
  end
end
