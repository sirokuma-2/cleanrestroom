class PostFacility
  include ActiveModel::Model
  attr_accessor :facility_id, :name, :address, :content, :latitude, :longitude,
                :nursing_room, :anyone_toilet, :diaper_changing_station, :powder_corner, :stroller_accessible,
                :image, :user_id

  with_options presence: true do
    validates :facility_id
    validates :name
    validates :address
    validates :content
    validates :latitude
    validates :longitude
    validates :image, presence: true, unless: :was_attached?
    validates :user_id
  end

  def save
    facility = Facility.new(name:, address:, content:, latitude:, longitude:,
                            nursing_room:, anyone_toilet:, diaper_changing_station:,
                            powder_corner:, stroller_accessible:)

    if image.present?
      facility.image.attach(image)
    end

    if facility.save
      Post.create(facility_id: facility.id, user_id:)
      true
    else
      false
    end
  end
end
