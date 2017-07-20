class Editor < ApplicationRecord
  has_many :versions, through: :editor_versions
end
