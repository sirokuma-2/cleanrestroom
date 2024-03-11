require 'rails_helper'

RSpec.describe PostFacility, type: :model do
  before do
    user = FactoryBot.create(:user)
    @post_facility = PostFacility.new(
      user_id: user.id,
      name: "施設名",
      address: "施設の住所",
      content: "施設の説明",
      latitude: 35.689487,
      longitude: 139.691706,
      nursing_room: true,
      anyone_toilet: true,
      diaper_changing_station: true,
      powder_corner: true,
      stroller_accessible: true,
    )
  end

  describe 'ユーザー新規登録' do

    context '新規登録できない場合' do
      it 'name情報が空では登録できない' do
        @post_facility.name = ''
        expect(@post_facility.valid?).to be false
        expect(@post_facility.errors.full_messages).to include("Name can't be blank")
      end
    end
  end
end
