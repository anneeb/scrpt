class Character < ApplicationRecord
  has_many :actions, through: :action_characters
end
