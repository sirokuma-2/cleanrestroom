require 'rails_helper'

RSpec.describe PostFacility, type: :model do
  before do
    facility = FactoryBot.create(:facility)
    puts facility.id
    user = FactoryBot.create(:user)
    puts user.id
    @post_facility = FactoryBot.build(:post,facility_id: facility.id, user_id: user.id)
    puts @post_facility.facility.id
  end

  describe 'ユーザー新規登録' do
    context '新規登録できる場合' do
      it 'すべての項目が存在すれば登録できる' do
        expect(@post_facility).to be_valid
      end
    end
    context '新規登録できない場合' do
      it 'userが空では登録できない' do
        @post_facility.user_id = ''
        @post_facility.valid?
        puts @post_facility.errors.full_messages
        expect(@post_facility.errors.full_messages).to include("User must exist")
      end
      it 'facility情報が空では登録できない' do
        @post_facility.facility_id = ''
        @post_facility.valid?
        puts @post_facility.errors.full_messages
        expect(@post_facility.errors.full_messages).to include("Facility must exist")
      end
      it 'address情報が空では登録できない' do
        @post_facility.facility.address = ''
        @post_facility.valid?
        puts @post_facility.errors.full_messages
        # expect(@post_facility.errors.full_messages).to include("Facility must exist")
      end
    end
  end
end
