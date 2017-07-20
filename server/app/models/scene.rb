class Scene < ApplicationRecord
  belongs_to :act
  has_many :actions
  has_many :characters, through: :actions
end
