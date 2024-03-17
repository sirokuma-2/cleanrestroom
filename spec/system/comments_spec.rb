require 'rails_helper'

RSpec.describe "Comments", type: :system do
  before do
    @user =  FactoryBot.create(:user)
    @user2 =  FactoryBot.create(:user)
    @facility = FactoryBot.create(:facility)
    @post_facility = FactoryBot.build(:post_facility,
                                       user_id: @user.id,
                                       facility_id: @facility.id,
                                       name: @facility.name,
                                       address: @facility.address,
                                       content: @facility.content,
                                       latitude: @facility.latitude,
                                       longitude: @facility.longitude,
                                       nursing_room: @facility.nursing_room,
                                       anyone_toilet: @facility.anyone_toilet,
                                       diaper_changing_station: @facility.diaper_changing_station,
                                       powder_corner: @facility.powder_corner,
                                       stroller_accessible: @facility.stroller_accessible,
                                       image: @facility.image,
                                       )
    end
end
