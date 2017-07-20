class Act < ApplicationRecord
  belongs_to :version
  has_many :scenes
  has_many :actions, through: :scenes
  has_many :characters, through: :actions
end
