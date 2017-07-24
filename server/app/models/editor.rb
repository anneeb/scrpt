class Editor < ApplicationRecord
  has_many :editor_versions
  has_many :versions, through: :editor_versions
end
