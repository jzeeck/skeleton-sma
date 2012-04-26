require 'rubygems'
require 'data_mapper'

DataMapper.setup(:default, 'sqlite3://#{Dir.pwd}/db/user.db' )

class User
  include DataMapper::Resource

  property :id, Serial
  property :email, String
  property :password, String
  property :userclass, String
  property :tagged, Int

  def self.authenticate(email, password)
    u = self.first(:email => email)
    u && u.password == password ? u : nil
  end

end

