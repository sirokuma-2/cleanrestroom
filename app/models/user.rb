class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :recoverable

  validates :name, presence: true

  has_many :posts
  has_many :comments
  has_one_attached :imageName
end
