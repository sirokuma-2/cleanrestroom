class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :recoverable

  has_many :posts
  has_many :comments
  has_one_attached :imageName

  validates :name, presence: true
  validate :image_or_name_present

  private
  def image_or_name_present
    return if name.present? || imageName.present?
    errors.add(:base, "Name or image must be present")
  end
end
