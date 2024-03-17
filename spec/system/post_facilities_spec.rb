require 'rails_helper'

RSpec.describe "PostFacilities", type: :system do
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

#   context '新規投稿ができるとき'do
#     it 'ログインしたユーザーは新規登録できる' do
#       # ログインする
#       sign_in(@user)
#       # 投稿ページに移動する
#       visit "#{new_post_path}?latitude=#{@post_facility.latitude}&longitude=#{@post_facility.longitude}"
#       sleep 1
#       # フォームに情報を入力する
#       fill_in '名称', with: @post_facility.name
#       fill_in '住所', with: @post_facility.address
#       fill_in 'コメント', with: @post_facility.content
#       @post_facility.nursing_room == true ? check('授乳室') : uncheck('授乳室')
#       @post_facility.anyone_toilet == true ? check('誰でもトイレ') : uncheck('誰でもトイレ')
#       @post_facility.diaper_changing_station == true ? check('オムツ交換台') : uncheck('オムツ交換台')
#       @post_facility.powder_corner == true ? check('パウダーコーナー') : uncheck('パウダーコーナー')
#       @post_facility.stroller_accessible == true ? check('ベビーカー可') : uncheck('ベビーカー可')



#       image_path = Rails.root.join('public/images/test_image.png')

#       # # # 画像選択フォームに画像を添付する
#       attach_file("post_facility[image]", image_path, make_visible: true)

#       # 送信するとPostモデルのカウントが1上がることを確認する

#       expect{
#       find('input[name="commit"]').click
#       sleep 1
#     }.to change {Post.count }.by(1)

#       # #最新のpostidを取得
#       latest_post_id= Post.last.id
#       visit post_path(latest_post_id)
#       # 投稿した内容の画像が存在することを確認する（画像）
#       expect(page).to have_xpath("//img[contains(@src, 'test_image')]")
#       # 先ほど投稿した内容の名前が存在することを確認する（テキスト）
#       expect(page).to have_content("#{@post_facility.name}")
#     end
#   end

#  context '新規投稿ができないとき'do
#     it 'ログインしていないと新規投稿ページに遷移できない' do
#       # トップページに遷移する
#       visit root_path
#       # 投稿ページに移動する
#       visit "#{new_post_path}?latitude=#{@post_facility.latitude}&longitude=#{@post_facility.longitude}"
#       expect(page).to have_content("ログイン")
#     end
#  end


#  context '投稿を編集できるとき'do
#     it 'ログインしたユーザーは自分が投稿した施設情報の編集ができる' do
#        # ログインする
#        sign_in(@user)
#        # 投稿ページに移動する
#        visit "#{new_post_path}?latitude=#{@post_facility.latitude}&longitude=#{@post_facility.longitude}"
#        sleep 1
#        # フォームに情報を入力する
#        fill_in '名称', with: @post_facility.name
#        fill_in '住所', with: @post_facility.address
#        fill_in 'コメント', with: @post_facility.content
#        @post_facility.nursing_room == true ? check('授乳室') : uncheck('授乳室')
#        @post_facility.anyone_toilet == true ? check('誰でもトイレ') : uncheck('誰でもトイレ')
#        @post_facility.diaper_changing_station == true ? check('オムツ交換台') : uncheck('オムツ交換台')
#        @post_facility.powder_corner == true ? check('パウダーコーナー') : uncheck('パウダーコーナー')
#        @post_facility.stroller_accessible == true ? check('ベビーカー可') : uncheck('ベビーカー可')



#        image_path = Rails.root.join('public/images/test_image.png')

#        # # # 画像選択フォームに画像を添付する
#        attach_file("post_facility[image]", image_path, make_visible: true)

#        # 送信するとPostモデルのカウントが1上がることを確認する

#        expect{
#        find('input[name="commit"]').click
#        sleep 1
#      }.to change {Post.count }.by(1)

#        # #最新のpostidを取得
#        latest_post_id= Post.last.id
#        visit edit_post_path(latest_post_id)

#        # すでに投稿済みの内容がフォームに入っていることを確認する
#        expect(page).to have_xpath("//img[contains(@src, 'test_image')]")
#        expect(page).to have_field('名称', with: @post_facility.name)
#        expect(page).to have_field('住所', with: @post_facility.address)
#        expect(page).to have_field('コメント', with: @post_facility.content)

#        # 投稿内容を編集する
#        fill_in '名称', with: "#{@post_facility.name}+編集した名称"
#        fill_in '住所', with: "#{@post_facility.address}+編集した住所"
#        fill_in 'コメント', with: "#{@post_facility.content}+編集したコメント"

#        image_path2 = Rails.root.join('public/images/test_image2.png')

#        # # # 画像選択フォームに画像を添付する
#        attach_file("facility[image]", image_path2, make_visible: true)


#        # 編集してもTweetモデルのカウントは変わらないことを確認する
#        expect{
#         find('input[name="commit"]').click
#         sleep 1
#       }.to change { Post.count }.by(0)

#       visit post_path(latest_post_id)
#       expect(page).to have_xpath("//img[contains(@src, 'test_image2')]")
#       expect(page).to have_content("#{@post_facility.name}+編集した名称")
#     end
#  end
#  context '投稿を編集できないとき'do
#   it 'ログインしたユーザーは自分以外の投稿した施設情報の編集画面にアクセスできない' do
#       # ログインする
#       sign_in(@user)

#       # 投稿ページに移動する
#       visit "#{new_post_path}?latitude=#{@post_facility.latitude}&longitude=#{@post_facility.longitude}"

#       # フォームに情報を入力する
#       fill_in '名称', with: @post_facility.name
#       fill_in '住所', with: @post_facility.address
#       fill_in 'コメント', with: @post_facility.content
#       @post_facility.nursing_room == true ? check('授乳室') : uncheck('授乳室')
#       @post_facility.anyone_toilet == true ? check('誰でもトイレ') : uncheck('誰でもトイレ')
#       @post_facility.diaper_changing_station == true ? check('オムツ交換台') : uncheck('オムツ交換台')
#       @post_facility.powder_corner == true ? check('パウダーコーナー') : uncheck('パウダーコーナー')
#       @post_facility.stroller_accessible == true ? check('ベビーカー可') : uncheck('ベビーカー可')
#       puts @post_facility.user_id


#       image_path = Rails.root.join('public/images/test_image.png')

#       # # # 画像選択フォームに画像を添付する
#       attach_file("post_facility[image]", image_path, make_visible: true)

#       # 送信するとPostモデルのカウントが1上がることを確認する

#       expect{
#       find('input[name="commit"]').click
#       sleep 1
#     }.to change {Post.count }.by(1)

#       latest_post_id= Post.last.id

#       find('a.nav_btn', text: 'ログアウト').click
#       expect(page).to have_content("ログイン")

#       visit new_user_session_path
#       fill_in 'メールアドレス', with: @user2.email
#       fill_in 'パスワード', with: @user2.password
#       find('input[name="commit"]').click

#       #@userが投稿したページの編集画面にアクセス
#       visit edit_post_path(latest_post_id)

#       expect(page).to have_no_content("編集する}")
#     end
#   end
  context '投稿を削除できるとき'do
    it 'ログインしたユーザーは自分が投稿した施設情報の削除ができる' do
       # ログインする
       sign_in(@user)
       # 投稿ページに移動する
       visit "#{new_post_path}?latitude=#{@post_facility.latitude}&longitude=#{@post_facility.longitude}"
       sleep 1
       # フォームに情報を入力する
       fill_in '名称', with: @post_facility.name
       fill_in '住所', with: @post_facility.address
       fill_in 'コメント', with: @post_facility.content
       @post_facility.nursing_room == true ? check('授乳室') : uncheck('授乳室')
       @post_facility.anyone_toilet == true ? check('誰でもトイレ') : uncheck('誰でもトイレ')
       @post_facility.diaper_changing_station == true ? check('オムツ交換台') : uncheck('オムツ交換台')
       @post_facility.powder_corner == true ? check('パウダーコーナー') : uncheck('パウダーコーナー')
       @post_facility.stroller_accessible == true ? check('ベビーカー可') : uncheck('ベビーカー可')

       image_path = Rails.root.join('public/images/test_image.png')

       # # # 画像選択フォームに画像を添付する
       attach_file("post_facility[image]", image_path, make_visible: true)

       # 送信するとPostモデルのカウントが1上がることを確認する
       expect{
       find('input[name="commit"]').click
       sleep 1
       }.to change {Post.count }.by(1)

       # #最新のpostidを取得
       latest_post_id= Post.last.id

       #ログアウト
       find('a.nav_btn', text: 'ログアウト').click
       expect(page).to have_content("ログイン")
       sleep 1

       #ログイン
       sign_in(@user)

       visit edit_post_path(latest_post_id)

       # 投稿を削除するとレコードの数が1減ることを確認する
       expect{
        find('a.facility-delete-btn').click
        sleep 5
        accept_confirm do
          click_link 'OK'
        end
      }.to change { Post.count }.by(-1)





      sleep
    end
 end

  # context '投稿を削除できないとき'do
  # it 'ログインしたユーザーは自分以外の投稿した施設情報を削除できない' do
  #     # ログインする
  #     sign_in(@user)

  #     # 投稿ページに移動する
  #     visit "#{new_post_path}?latitude=#{@post_facility.latitude}&longitude=#{@post_facility.longitude}"

  #     # フォームに情報を入力する
  #     fill_in '名称', with: @post_facility.name
  #     fill_in '住所', with: @post_facility.address
  #     fill_in 'コメント', with: @post_facility.content
  #     @post_facility.nursing_room == true ? check('授乳室') : uncheck('授乳室')
  #     @post_facility.anyone_toilet == true ? check('誰でもトイレ') : uncheck('誰でもトイレ')
  #     @post_facility.diaper_changing_station == true ? check('オムツ交換台') : uncheck('オムツ交換台')
  #     @post_facility.powder_corner == true ? check('パウダーコーナー') : uncheck('パウダーコーナー')
  #     @post_facility.stroller_accessible == true ? check('ベビーカー可') : uncheck('ベビーカー可')
  #     puts @post_facility.user_id


  #     image_path = Rails.root.join('public/images/test_image.png')

  #     # # # 画像選択フォームに画像を添付する
  #     attach_file("post_facility[image]", image_path, make_visible: true)

  #     # 送信するとPostモデルのカウントが1上がることを確認する

  #     expect{
  #     find('input[name="commit"]').click
  #     sleep 1
  #   }.to change {Post.count }.by(1)

  #     latest_post_id= Post.last.id

  #     find('a.nav_btn', text: 'ログアウト').click
  #     expect(page).to have_content("ログイン")

  #     visit new_user_session_path
  #     fill_in 'メールアドレス', with: @user2.email
  #     fill_in 'パスワード', with: @user2.password
  #     find('input[name="commit"]').click

  #     #@userが投稿したページの編集画面にアクセス
  #     visit edit_post_path(latest_post_id)

  #     expect(page).to have_no_content("削除する}")
  #   end
  #   it 'ログインしていないと施設情報の削除できない' do
  #     # ログインする
  #     sign_in(@user)

  #     # 投稿ページに移動する
  #     visit "#{new_post_path}?latitude=#{@post_facility.latitude}&longitude=#{@post_facility.longitude}"

  #     # フォームに情報を入力する
  #     fill_in '名称', with: @post_facility.name
  #     fill_in '住所', with: @post_facility.address
  #     fill_in 'コメント', with: @post_facility.content
  #     @post_facility.nursing_room == true ? check('授乳室') : uncheck('授乳室')
  #     @post_facility.anyone_toilet == true ? check('誰でもトイレ') : uncheck('誰でもトイレ')
  #     @post_facility.diaper_changing_station == true ? check('オムツ交換台') : uncheck('オムツ交換台')
  #     @post_facility.powder_corner == true ? check('パウダーコーナー') : uncheck('パウダーコーナー')
  #     @post_facility.stroller_accessible == true ? check('ベビーカー可') : uncheck('ベビーカー可')
  #     puts @post_facility.user_id


  #     image_path = Rails.root.join('public/images/test_image.png')

  #     # # # 画像選択フォームに画像を添付する
  #     attach_file("post_facility[image]", image_path, make_visible: true)

  #     # 送信するとPostモデルのカウントが1上がることを確認する

  #     expect{
  #     find('input[name="commit"]').click
  #     sleep 1
  #     }.to change {Post.count }.by(1)

  #     latest_post_id= Post.last.id

  #     find('a.nav_btn', text: 'ログアウト').click

  #     #@userが投稿したページの編集画面にアクセス
  #     visit edit_post_path(latest_post_id)

  #     expect(page).to have_no_content("削除する}")
  #   end
  # end
end
