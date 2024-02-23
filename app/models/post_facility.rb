class PostFacility
  include ActiveModel::Model
  attr_accessor :facility_id,:name,:address,:content,:latitude,:longitude, :image

  with_options presence: true do
    validates :facility_id
    validates :name
    validates :address
    validates :content
    validates :latitude
    validates :longitude
    validates :image, presence: true, unless: :was_attached?
  end

  def save
    facility=Facility.create(name:,address:,content:,latitude:,longitude:)
    if facility.persisted?
      Post.create(facility_id: facility.id)
    else
      false
    end
    facility.image.attach(image) if image.present?
    if facility.save
      puts '画像が保存されました'
    end
  end

  def was_attached?
    self.image.attached?
  end
end
