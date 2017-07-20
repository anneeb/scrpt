class Script < ApplicationRecord
  has_secure_password
  has_many :versions
  has_many :editors, through: :editor_versions
  has_many :acts, through: :versions
  has_many :scenes, through: :acts
  has_many :actions, through: :scenes
  has_many :characters, through: :actions
end
