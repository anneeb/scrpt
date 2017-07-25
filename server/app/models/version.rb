class Version < ApplicationRecord
  belongs_to :script
  has_many :editor_versions
  has_many :editors, through: :editor_versions
end
