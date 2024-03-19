require 'rails_helper'

RSpec.describe PostFacility, type: :model do
  before do
    user = FactoryBot.create(:user)
    facility = FactoryBot.create(:facility)
    @post_facility = FactoryBot.build(:post_facility,
                                      user_id: user.id,
                                      facility_id: facility.id,
                                      name: facility.name,
                                      address: facility.address,
                                      content: facility.content,
                                      latitude: facility.latitude,
                                      longitude: facility.longitude,
                                      nursing_room: facility.nursing_room,
                                      anyone_toilet: facility.anyone_toilet,
                                      diaper_changing_station: facility.diaper_changing_station,
                                      powder_corner: facility.powder_corner,
                                      stroller_accessible: facility.stroller_accessible,
                                      image: facility.image)
    sleep 0.1
  end

  describe '施設情報を登録できる場合' do
    context '施設情報を登録できる場合' do
      it 'すべての項目が存在すれば登録できる' do
        expect(@post_facility).to be_valid
      end
      it 'nameが空でもimageがあれば登録できる' do
        @post_facility.name = ''
        expect(@post_facility).to be_valid
      end
      it 'imageが空でもnameがあれば登録できる' do
        @post_facility.image = nil
        expect(@post_facility).to be_valid
      end
    end

    context '施設情報を登録できない場合' do
      it 'user_idが空では登録できない' do
        @post_facility.user_id = ''
        @post_facility.valid?
        expect(@post_facility.errors.full_messages).to include("User can't be blank")
      end
      it 'facility_idが空では登録できない' do
        @post_facility.facility_id = ''
        @post_facility.valid?
        expect(@post_facility.errors.full_messages).to include("Facility can't be blank")
      end
      it 'addressが空では登録できない' do
        @post_facility.address = ''
        @post_facility.valid?
        expect(@post_facility.errors.full_messages).to include("Address can't be blank")
      end
      it 'contentが空では登録できない' do
        @post_facility.content = ''
        @post_facility.valid?
        expect(@post_facility.errors.full_messages).to include("Content can't be blank")
      end
      it 'longitudeが空では登録できない' do
        @post_facility.longitude = ''
        @post_facility.valid?
        expect(@post_facility.errors.full_messages).to include("Longitude can't be blank")
      end
      it 'latitudeが空では登録できない' do
        @post_facility.latitude = ''
        @post_facility.valid?
        expect(@post_facility.errors.full_messages).to include("Latitude can't be blank")
      end
      it 'nameかつimageが空では登録できない' do
        @post_facility.name = ''
        @post_facility.image = ''
        @post_facility.valid?
        expect(@post_facility.errors.full_messages).to include('Name or image must be present')
      end
    end
  end
end
