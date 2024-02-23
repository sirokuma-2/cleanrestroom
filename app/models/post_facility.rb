class PostFacility
  include ActiveModel::Model
  attr_accessor :facility_id,:name,:address,:content,:latitude,:longitude

  with_options presence: true do
    validates :facility_id
    validates :name
    validates :address
    validates :content
    validates :latitude
    validates :longitude
  end

  def save
    facility=Facility.create(name:,address:,content:,latitude:,longitude:)
    if facility.persisted?
      # Facilityが正しく保存された場合、そのIDをfacility_idとしてPostを保存
      Post.create(facility_id: facility.id)
    else
      # Facilityの保存に失敗した場合、falseを返して処理を終了
      false
    end
  end
end
