class Script < ApplicationRecord
  has_secure_password
  has_many :versions, -> { order(created_at: :desc) }
  has_many :editors, through: :versions

end
