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

ActiveRecord::Schema.define(version: 20170113195708) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "taskers", force: :cascade do |t|
    t.string   "first_name",                                                                                                               null: false
    t.string   "last_name",                                                                                                                null: false
    t.string   "username",                                                                                                                 null: false
    t.string   "email",                                                                                                                    null: false
    t.string   "profile_img_link", default: "http://res.cloudinary.com/delisauce/image/upload/v1484337646/default-profile-img_c1ir5w.png", null: false
    t.text     "description",                                                                                                              null: false
    t.integer  "rate",                                                                                                                     null: false
    t.boolean  "auto_book",        default: false,                                                                                         null: false
    t.string   "skill",                                                                                                                    null: false
    t.string   "location"
    t.float    "latitude"
    t.float    "longitude"
    t.datetime "created_at",                                                                                                               null: false
    t.datetime "updated_at",                                                                                                               null: false
    t.index ["username"], name: "index_taskers_on_username", unique: true, using: :btree
  end

  create_table "tasks", force: :cascade do |t|
    t.integer  "tasker_id",   null: false
    t.integer  "user_id",     null: false
    t.date     "date",        null: false
    t.text     "description", null: false
    t.string   "location"
    t.float    "latitude"
    t.float    "longitude"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.string   "email",           null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["username"], name: "index_users_on_username", unique: true, using: :btree
  end

end