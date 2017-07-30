class VersionSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :contentState, :editors

  def editors
    object.editors.map do |editor|
      EditorSerializer.new(editor)
    end
  end
end
