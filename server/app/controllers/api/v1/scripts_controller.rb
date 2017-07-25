module Api
  module V1
    class ScriptsController < ApplicationController

      def create
        if password_match
          script = get_script
          version = get_version(script)
          editor = get_editor(version)
        end

        if editor
          created_token = issue_token({
            cuid: script.cuid,
            editor: editor.id
          })
          return render json: {
            payload: {
              editor: ActiveModel::Serializer::EditSerializer.new(editor),
              script: ActiveModel::Serializer::ScriptSerializer.new(script)
            },
            token: created_token
          }
        end
        render json: {
          error: 'Script did not save. Please try again.'
        }
      end

      def show
        script = Script.find_by(cuid: params[:id])
        if script
          return render json: {
            payload: {
              script: ActiveModel::Serializer::ScriptSerializer.new(script)
            }
          }
        end
        render json: {
          error: "Could not find script with cuid #{params[:cuid]}"
        }
      end

      def destroy
      end

      private

      def script_params
        params.require(:script).permit(:title, :cuid, :password)
      end

      def editor_params
        params.require(:editor).permit(:name)
      end

      def version_params
        params.require(:version).permit(:editorState)
      end

      def password_match
        params[:script][:password] === params[:script][:confirmPassword]
      end

      def get_script
        script = Script.new(script_params)
        script.save ? script : false
      end

      def get_version (script)
        return false if !script
        version = Version.new(version_params)
        version.script = script
        version.save ? version : false
      end

      def get_editor (version)
        return false if !version
        editor = Editor.new(editor_params)
        version.editors.push(editor)
        editor.save ? editor : false
      end

    end
  end
end
