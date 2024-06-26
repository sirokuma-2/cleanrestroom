class PostFacility
  include ActiveModel::Model
  attr_accessor :facility_id, :name, :address, :content, :latitude, :longitude,
                :nursing_room, :anyone_toilet, :diaper_changing_station, :powder_corner,
                :stroller_accessible, :image, :user_id, :hash_id

  with_options presence: true do
    validates :facility_id
    validates :address
    validates :content
    validates :latitude
    validates :longitude
    validates :user_id
    validates :hash_id
  end

  validate :image_or_name_present

  def save
    facility = Facility.new(name:, address:, content:, latitude:, longitude:,
                            nursing_room:, anyone_toilet:, diaper_changing_station:,
                            powder_corner:, stroller_accessible:)

    facility.image.attach(image) if image.present?

    if facility.save
      Post.create(facility_id: facility.id, user_id:, hash_id:)
    else
      false
    end
  end

  private

  def image_or_name_present
    return if name.present? || image.present?

    errors.add(:base, 'Name or image must be present')
  end
end
