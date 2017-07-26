module Api
  module V1
    class VersionsController < ApplicationController
      before_action :authorize_editor!

      def create
        version = Version.new(version_params)
        version.script = current_script
        version.editors.push(current_editor)
        if version.save
          return render json: {
            payload: {
              script: ScriptSerializer.new(version.script)
            }
          }
        end
        render json: {
          error: 'Version did not save. Please try again.'
        }
      end

      private

      def version_params
        params.require(:version).permit(:contentState)
      end

    end
  end
end
