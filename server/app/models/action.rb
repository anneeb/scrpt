class Action < ApplicationRecord
  belongs_to :scene
  has_many :characters, through: :action_characters
end
