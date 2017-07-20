class CreateScripts < ActiveRecord::Migration[5.1]
  def change
    create_table :scripts do |t|
      t.string :title
      t.string :password_digest
      t.string :cuid

      t.timestamps
    end
  end
end
