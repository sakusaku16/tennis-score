require_relative "boot"

require "rails"
require "active_model/railtie"
require "action_controller/railtie"
require "action_cable/engine"
require "rails/test_unit/railtie"

Bundler.require(*Rails.groups)

module TennisScore
  class Application < Rails::Application
    config.load_defaults 7.0
    config.api_only = true
    
    # Action Cable設定
    config.action_cable.mount_path = '/cable'
    config.action_cable.allowed_request_origins = [/http:\/\/.*/, /https:\/\/.*/]
    
    # CORS設定
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        resource '*',
          headers: :any,
          methods: [:get, :post, :put, :patch, :delete, :options, :head]
      end
    end
  end
end
