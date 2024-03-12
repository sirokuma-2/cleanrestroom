class Facility < ApplicationRecord
  has_one :post
  has_one_attached :image

  validates :name, presence: true, unless: :was_attached?

  def was_attached?
    image.attached?
  end
end
