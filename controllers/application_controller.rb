require 'sinatra/base'
require 'mustache/sinatra'
#Begin Warden
require 'sinatra'
require 'warden'
#End Warden

class ApplicationController < Sinatra::Base
    # Middleware
    use Rack::Session::Cookie, :secret => "bigbrother"

    #Begin Warden
    use Warden::Manager do |manager|
        manager.default_strategies :password, :basic
        manager.failure_app = "login"
    end
	
    Warden::Manager.serialize_into_session do |user|
        user.id
    end

    Warden::Manager.serialize_from_session do |id|
        User.get(id)
    end

Warden::Strategies.add(:password) do
  def valid?
    # params['email'] && params['password']
    # p params
    true
  end

  def authenticate!
    u = User.authenticate(params['email'], params['password'])
    u.nil? ? fail!("Could not log you in.") : success!(u)
  end
end

Warden::Strategies.add(:basic) do

  def valid?
    params[:username] || params[:password]
  end

  def authenticate!
    u = User.authenticate(params[:username], params[:password])
    u.nil? ? fail!("Could not log in") : success!(u)
  end
end

    #END Warden

    # Extra Sinatra components
    # register Sinatra::MultiRoute
    # register Sinatra::ConfigFile

    # Set up Mustache
    register Mustache::Sinatra
    require_relative '../views/layout'

    # set folder for templates to ../views, but make the path absolute 
    set :views, File.expand_path('../../views', __FILE__)
    set :mustache, {
        :views     => views,
        :templates => views
    }

    # Set up public folder
    set :public_folder, File.expand_path('../../public', __FILE__)

    # Site specific settings
    set :title, "Social Media Analyser"

    # Configuration
    # config_file File.expand_path('../../settings.yml', __FILE__) 
    # configure do
    # end

    before do
        @session = session
    end

    # Index page
    get '/' do 
        mustache :index
    end
end
