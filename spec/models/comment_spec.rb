require 'rails_helper'

RSpec.describe Comment, type: :model do
  before do
    @comment = FactoryBot.build(:comment)
  end

  describe 'コメントを登録できる場合' do
    context 'コメントを登録できる場合' do
      it 'すべての項目が存在すれば登録できる' do
        expect(@comment).to be_valid
      end
      it 'contentが空でも登録できる' do
        @comment.content = ''
        @comment.valid?
        expect(@comment).to be_valid
      end
    end
    context 'コメントを登録できない場合' do
      it 'Ratingが空では登録できない' do
        @comment.rating = ''
        @comment.valid?
        expect(@comment.errors.full_messages).to include("Rating can't be blank")
      end
    end
  end
end
