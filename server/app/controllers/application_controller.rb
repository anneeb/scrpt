class ApplicationController < ActionController::API

  private

  def issue_token (payload)
    JWT.encode(payload, secret, algorithm)
  end

  def authorize_editor!
    if !current_script.present? || !current_editor.present?
      render json: {error: 'No authentication'}
    end
  end

  def current_script
    @current_script ||= Script.find_by(cuid: token_script_cuid)
  end

  def current_editor
    @current_editor ||= Editor.find_by(id: token_editor_id)
  end

  def token_script_cuid
    decoded_token.first['cuid']
  end

  def token_editor_id
    decoded_token.first['id']
  end

  def decoded_token
    if token
      begin
        JWT.decode(token, secret, true, {algorithm: algorithm})
      rescue JWT::DecodeError
        return [{}]
      end
    else
      [{}]
    end
  end

  def token
    request.headers['Authorization']
  end

  def secret
    "scrptsecret"
  end

  def algorithm
    "HS256"
  end

end
