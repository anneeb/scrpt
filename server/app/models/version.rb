class Version < ApplicationRecord
  belongs_to :script
  has_many :editors, through: :editor_versions
  has_many :acts
  has_many :scenes, through: :acts
  has_many :actions, through: :scenes
  has_many :characters, through: :actions
end
