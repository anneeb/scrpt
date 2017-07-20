class EditorVersion < ApplicationRecord
  belongs_to :version
  belongs_to :editor
end
