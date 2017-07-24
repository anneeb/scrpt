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
              cuid: script.cuid,
              editor: {
                id: editor.id,
                name: editor.name
              }
            },
            token: created_token
          }
        end
        render json: {
          error: 'Something went wrong. Please try again.'
        }, status: 404
      end

      def show
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
