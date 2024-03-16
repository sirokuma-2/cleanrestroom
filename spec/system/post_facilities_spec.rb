require 'rails_helper'

RSpec.describe "PostFacilities", type: :system do
  before do
    @user = FactoryBot.create(:user)
  end
  context 'ツイート投稿ができるとき'do
  it 'ログインしたユーザーは新規登録できる' do
    # ログインする
    sign_in(@user)
    # 新規投稿ページへのボタンがあることを確認する
    # 投稿ページに移動する
    # フォームに情報を入力する
    # 送信するとTweetモデルのカウントが1上がることを確認する
    # トップページには先ほど投稿した内容のツイートが存在することを確認する（画像）
    # トップページには先ほど投稿した内容のツイートが存在することを確認する（テキスト）
  end
end

end
