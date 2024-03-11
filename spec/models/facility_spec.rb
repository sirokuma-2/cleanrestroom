require 'rails_helper'

RSpec.describe Facility, type: :model do
  before do
    @facility = FactoryBot.build(:facility)
    puts @facility.name
    puts @facility.address
  end

  describe 'ユーザー新規登録' do
    context '新規登録できる場合' do
      it 'すべての項目が存在すれば登録できる' do
        expect(@facility).to be_valid
      end
    end
    context '新規登録できない場合' do
      it 'nameが空では登録できない' do
        @facility.name = ''
        @facility.valid?
        puts @facility.errors.full_messages
        # expect(@post_facility.errors.full_messages).to include("User must exist")
      end
    end
  end
end
