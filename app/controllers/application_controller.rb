class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :set_active_storage_host

  private

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :imageName])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name, :imageName])
  end

  # 結合テストでのエラー回避のため
  def set_active_storage_host
    ActiveStorage::Current.url_options = { protocol: request.protocol, host: request.host, port: request.port }
  end

end
