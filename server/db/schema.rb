# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170720134950) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "editor_versions", force: :cascade do |t|
    t.bigint "version_id"
    t.bigint "editor_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["editor_id"], name: "index_editor_versions_on_editor_id"
    t.index ["version_id"], name: "index_editor_versions_on_version_id"
  end

  create_table "editors", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "scripts", force: :cascade do |t|
    t.string "title"
    t.string "password_digest"
    t.string "cuid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "versions", force: :cascade do |t|
    t.bigint "script_id"
    t.text "editorState"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["script_id"], name: "index_versions_on_script_id"
  end

  add_foreign_key "editor_versions", "editors"
  add_foreign_key "editor_versions", "versions"
  add_foreign_key "versions", "scripts"
end
