class ScriptSerializer < ActiveModel::Serializer
  attributes :title, :cuid, :id
  has_many :versions
  has_many :editors
end
