class Facility < ApplicationRecord
  has_one :post
  has_one_attached :image
end
