class Post < ApplicationRecord
  before_create :generate_hash_id

  belongs_to :facility, dependent: :destroy
  belongs_to :user
  has_many :comments, dependent: :destroy

  private

  def generate_hash_id
    self.hash_id = Digest::SHA256.hexdigest("#{id}#{Time.current.to_i}")
  end
end
