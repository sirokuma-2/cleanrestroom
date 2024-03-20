class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :recoverable

  has_many :posts
  has_many :comments
  has_one_attached :imageName

  validates :name, presence: true, uniqueness: true, format: { with: /\A[a-zA-Z0-9]+\z/ }

  def to_param
    name
  end
end
