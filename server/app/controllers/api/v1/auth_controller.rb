module Api
  module V1
    class AuthController < ApplicationController
      before_action :authorize_user!, only: [:show]

      def create
        script = Script.find_by(cuid: params[:script][:cuid])
        if script.present? && script.authenticate(params[:script][:password])
          editor = script.editors.find_by(name: params[:editor][:name]) || Editor.create(editor_params)
          created_token = issue_token({
            cuid: script.cuid,
            editor: editor.id
          })
          render json: {
            payload: {
              editor: editor,
              script: script
            },
            token: created_token
          }
        else
          render json: {
            error: 'Invalid password. Please try again.'
          }
        end
      end

      def show
        render json: {
          id: current_user.id,
          first_name: current_user.first_name,
          last_name: current_user.last_name
        }
      end

      private

      def editor_params
        params.require(:editor).permit(:name)
      end

    end
  end
end
