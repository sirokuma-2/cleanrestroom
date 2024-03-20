class PostFacility
  include ActiveModel::Model
  attr_accessor :facility_id, :name, :address, :content, :latitude, :longitude,
                :nursing_room, :anyone_toilet, :diaper_changing_station, :powder_corner, :stroller_accessible,
                :image, :user_id, :hashId

  with_options presence: true do
    validates :facility_id
    # validates :name
    validates :address
    validates :content
    validates :latitude
    validates :longitude
    # validates :image, presence: true, unless: :was_attached?
    validates :user_id
    validates :hashId
  end

  validate :image_or_name_present

  def save
    facility = Facility.new(name:, address:, content:, latitude:, longitude:,
                            nursing_room:, anyone_toilet:, diaper_changing_station:,
                            powder_corner:, stroller_accessible:)

    facility.image.attach(image) if image.present?

    if facility.save
      Post.create(facility_id: facility.id, user_id:, hashId:)

    else
      false
    end
  end

  # //rspec用
  def was_attached?
    image.present?
  end

  private

  def image_or_name_present
    return if name.present? || image.present?

    errors.add(:base, 'Name or image must be present')
  end
end
