class Post < ApplicationRecord
  belongs_to :facility, dependent: :destroy
  belongs_to :user
  has_many :comments, dependent: :destroy

end
