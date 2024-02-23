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
    facility = Facility.new(name: name, address: address, content: content, latitude: latitude, longitude: longitude)

    if image.present?
      facility.image.attach(image)
      puts '画像が保存されました'
    end

    if facility.save
      Post.create(facility_id: facility.id)
      true
    else
      false
    end
  end
end
