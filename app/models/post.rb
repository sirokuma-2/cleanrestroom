class Post < ApplicationRecord
  belongs_to :facility
  belongs_to :user
  has_many :comments
end
