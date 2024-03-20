require 'rails_helper'

RSpec.describe 'Comments', type: :system do
  before do
    @user = FactoryBot.create(:user)
    @user2 =  FactoryBot.create(:user)
    @facility = FactoryBot.create(:facility)
    @comment = FactoryBot.create(:comment)
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
                                      image: @facility.image)
  end

  it 'ログインしたユーザーはコメント投稿できる' do
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
    attach_file('post_facility[image]', image_path, make_visible: true)

    # 送信するとPostモデルのカウントが1上がることを確認する

    expect do
      find('input[name="commit"]').click
      sleep 1
    end.to change { Post.count }.by(1)

    # #最新のpostidを取得
    latest_post_id = Post.last.hash_id

    find('a.nav_btn', text: 'ログアウト').click
    expect(page).to have_content('ログイン')

    sign_in(@user2)

    visit new_post_comment_path(latest_post_id)

    # コメントを記入
    find("img[alt='#{@comment.rating}']").click
    fill_in 'コメントを書く', with: @comment.content

    expect  do
      find('input[name="commit"]').click
      sleep 1
    end.to change { Comment.count }.by(1)

    # ページ上の星の数を数える
    stars_count = page.all('img.rating-star').size

    # 星の数が期待するratingの値と一致しているかを検証
    expect(stars_count).to eq(@comment.rating)

    expect(page).to have_content(@comment.content)
  end
end
