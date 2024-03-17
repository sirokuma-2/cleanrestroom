require 'rails_helper'

# RSpec.describe "Users", type: :system do
#   before do
#     @user = FactoryBot.build(:user)

#   end

  # context 'ユーザー新規登録ができるとき' do
  #   it '正しい情報を入力すればユーザー新規登録ができてトップページに移動する' do
  #     # トップページに移動する
  #     visit root_path
  #     # トップページにサインアップページへ遷移するボタンがあることを確認する
  #     expect(page).to have_content('新規登録')
  #     visit new_user_registration_path
  #     # ユーザー情報を入力する
  #     # 添付する画像を定義する
  #     image_path = Rails.root.join('public/images/test_image.png')
  #     # 画像選択フォームに画像を添付する
  #     attach_file('user[imageName]', image_path, make_visible: true)
  #     fill_in 'アカウント名', with: @user.name
  #     fill_in 'メールアドレス', with: @user.email
  #     fill_in 'パスワード', with: @user.password
  #     fill_in 'パスワード確認', with: @user.password_confirmation
  #     # サインアップボタンを押すとユーザーモデルのカウントが1上がることを確認する
  #     expect{
  #       find('input[name="commit"]').click
  #       sleep 1
  #     }.to change { User.count }.by(1)
  #     # トップページへ遷移することを確認する
  #     expect(page).to have_current_path(root_path)
  #     # カーソルを合わせるとログアウトボタンが表示されることを確認する
  #     expect(page).to have_content('ログアウト')
  #     # サインアップページへ遷移するボタンや、ログインページへ遷移するボタンが表示されていないことを確認する
  #     expect(page).to have_no_content('新規登録')
  #     expect(page).to have_no_content('ログイン')
  #   end
  # end
#   context 'ユーザー新規登録ができないとき' do
#     it '誤った情報ではユーザー新規登録ができずに新規登録ページへ戻ってくる' do
#       # トップページに移動する
#       visit root_path
#       # トップページにサインアップページへ遷移するボタンがあることを確認する
#       expect(page).to have_content('新規登録')
#       # 新規登録ページへ移動する
#       visit new_user_registration_path
#       # ユーザー情報を入力する
#       fill_in 'アカウント名', with: ''
#       fill_in 'メールアドレス', with: ''
#       fill_in 'パスワード', with: ''
#       fill_in 'パスワード確認', with: ''
#       # サインアップボタンを押してもユーザーモデルのカウントは上がらないことを確認する
#       expect{
#         find('input[name="commit"]').click
#         sleep 1
#       }.to change { User.count }.by(0)
#       # 新規登録ページへ戻されることを確認する
#       expect(page).to have_current_path(new_user_registration_path)
#     end
#   end
# end

# RSpec.describe 'ログイン', type: :system do
#   before do
#     @user = FactoryBot.create(:user)
#   end
#   context 'ログインができるとき' do
#     it '保存されているユーザーの情報と合致すればログインができる' do
#       # トップページに移動する
#       visit root_path
#       # トップページにログインページへ遷移するボタンがあることを確認する
#       expect(page).to have_content('新規登録')
#       # ログインページへ遷移する
#       visit new_user_session_path
#       sleep 1
#       # 正しいユーザー情報を入力する
#       fill_in 'メールアドレス', with: @user.email
#       fill_in 'パスワード', with: @user.password
#       # ログインボタンを押す
#       find('input[name="commit"]').click
#       # トップページへ遷移することを確認する
#       expect(page).to have_current_path(root_path)
#       # カーソルを合わせるとログアウトボタンが表示されることを確認する
#       expect(find('.nav-btn-wrapper')).to have_content('ログアウト')
#       # サインアップページへ遷移するボタンやログインページへ遷移するボタンが表示されていないことを確認する
#       expect(page).to have_no_content('新規登録')
#       expect(page).to have_no_content('ログイン')
#     end
#   end
#   context 'ログインができないとき' do
#     it '保存されているユーザーの情報と合致しないとログインができない' do
#       # トップページに移動する
#       visit root_path
#       # トップページにログインページへ遷移するボタンがあることを確認する
#       expect(page).to have_content('ログイン')
#       # ログインページへ遷移する
#       visit new_user_session_path
#       # ユーザー情報を入力する
#       fill_in 'メールアドレス', with: ''
#       fill_in 'パスワード', with: ''
#       # ログインボタンを押す
#       find('input[name="commit"]').click
#       # ログインページへ戻されることを確認する
#       expect(page).to have_current_path(new_user_session_path)
#     end
#   end
# end

RSpec.describe 'ユーザー情報編集', type: :system do
  before do
    @user = FactoryBot.create(:user)
    @user2 = FactoryBot.create(:user)
    puts @user.id
  end

  context '編集ができるとき' do
    it '保存されているユーザーの情報と合致すればログインができる' do
      visit new_user_session_path
      fill_in 'メールアドレス', with: @user.email
      fill_in 'パスワード', with: @user.password

      find('input[name="commit"]').click

      expect(page).to have_current_path(root_path)

      find('a.nav_btn', text: 'マイページ').click

      find('a.edit-button', text: '編集').click

      expect(page).to have_xpath("//img[contains(@src, 'test_image')]")
      expect(page).to have_field('アカウント名', with: @user.name)
      expect(page).to have_field('メールアドレス', with: @user.email)

      fill_in 'アカウント名', with: "#{@user.name}+編集した名称"
      fill_in 'メールアドレス', with: "change#{@user.email}"

      image_path2 = Rails.root.join('public/images/test_image2.png')

      # # # 画像選択フォームに画像を添付する
      attach_file("user[imageName]", image_path2, make_visible: true)

      # 編集してもTweetモデルのカウントは変わらないことを確認する
      expect{
      find('input[name="commit"]').click
      sleep 1
      }.to change { User.count }.by(0)

    end
  end
  # context '編集ができないとき' do
  #   it '保存されているユーザーの情報と合致しないとログインができない' do
  #     visit new_user_session_path
  #     fill_in 'メールアドレス', with: @user2.email
  #     fill_in 'パスワード', with: @user2.password

  #     find('input[name="commit"]').click

  #     find('a.nav_btn', text: 'マイページ').click

  #     find('a.edit-button', text: '編集').click

  #     expect(page).to have_no_content("編集")
  #   end
  # end
end
