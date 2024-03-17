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
    end
    context 'コメントを登録できない場合' do
      it 'Ratingが空では登録できない' do
        @comment.rating = ''
        @comment.valid?
        expect(@comment.errors.full_messages).to include("Rating can't be blank")
      end
      it 'contentが空では登録できない' do
        @comment.content = ''
        @comment.valid?
        expect(@comment.errors.full_messages).to include("Content can't be blank")
      end
      it '重複したuserIdが存在する場合はコメントできない' do
        @comment.save
        same_user = FactoryBot.build(:comment, user_id: @comment.user_id ,post_id: @comment.post_id)
        same_user.valid?
        expect(same_user.errors.full_messages).to include('User コメントは一人１回である必要があります')
      end
    end
  end
end
