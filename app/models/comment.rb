class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user
  validates :user_id, uniqueness: { scope: :post_id , message: "コメントは一人１回である必要があります"}
  validates  :rating, presence: true
end
