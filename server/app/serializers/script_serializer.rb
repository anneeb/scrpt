class ScriptSerializer < ActiveModel::Serializer
  attributes :title, :cuid
  has_many :versions
  has_many :editors
end
