class ActionCharacter < ApplicationRecord
  belongs_to :character
  belongs_to :action
end
