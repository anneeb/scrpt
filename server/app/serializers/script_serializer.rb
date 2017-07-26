class ScriptSerializer < ActiveModel::Serializer
  attributes :title, :cuid, :id, :editors
  has_many :versions

  def editors
    object.editors.uniq.map do |editor|
      EditorSerializer.new(editor)
    end 
  end
end
