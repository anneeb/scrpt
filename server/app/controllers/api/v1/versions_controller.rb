module Api
  module V1
    class VersionsController < ApplicationController
      before_action :authorize_editor!

      def create
        version = Version.new(version_params)
        if version.save
          render json: {
            payload: {
              version: ActiveModel::Serializer::VersionSerializer.new(version)
            }
          }
        end
        render json: {
          error: 'Version did not save. Please try again.'
        }
      end

      private

      def version_params
        params.require(:version).permit(:contentState, :script_id, :editor_id)
      end

    end
  end
end
