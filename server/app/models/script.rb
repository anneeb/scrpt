class Script < ApplicationRecord
  has_secure_password
  has_many :versions
  has_many :editors, through: :versions
end
