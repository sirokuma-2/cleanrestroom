require 'rails_helper'

RSpec.describe "PostFacilities", type: :system do
  before do
    @user =  FactoryBot.create(:user)
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

  context '新規投稿ができるとき'do
  it 'ログインしたユーザーは新規登録できる' do
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



    # image_path = Rails.root.join('public/images/test_image.png')

    # # # 画像選択フォームに画像を添付する
    # attach_file("post_facility[image]", image_path, make_visible: true)

    # 送信するとPostモデルのカウントが1上がることを確認する

    find('input[name="commit"]').click
    sleep 5

    # #最新のpostidを取得
    latest_post_id= Post.last.id
    puts latest_post_id
    visit post_path(latest_post_id)
    # 投稿した内容の画像が存在することを確認する（画像）
    # 先ほど投稿した内容の名前が存在することを確認する（テキスト）
    expect(page).to have_content("#{@post_facility.name}")
  end
 end
end
