module Api
  module V1
    class AuthController < ApplicationController
      before_action :authorize_editor!, only: [:show]

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
              editor: ActiveModel::Serializer::EditSerializer.new(editor),
              script: ActiveModel::Serializer::ScriptSerializer.new(script)
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
          payload: {
            editor: ActiveModel::Serializer::EditSerializer.new(editor),
            script: ActiveModel::Serializer::ScriptSerializer.new(script)
          }
        }
      end

      private

      def editor_params
        params.require(:editor).permit(:name)
      end

    end
  end
end
