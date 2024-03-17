require 'rails_helper'
describe PostsController, type: :request do
  # before do
  #   @tweet = FactoryBot.create(:post)
  # end

  describe 'GET #index' do
    it 'topアクションにリクエストすると正常にレスポンスが返ってくる' do
      get root_path
      # binding.pry
      expect(response.status).to eq(200)
    end
    it 'indexアクションにリクエストすると正常にレスポンスが返ってくる' do
      get posts_path
      expect(response.status).to eq(200)
    end
    it 'topアクションにリクエストするとレスポンスにマップが存在する' do
      get root_path
      expect(response.body).to include('top-map')
    end
    it 'indexアクションにリクエストするとレスポンスにマップが存在する' do
      get posts_path
      expect(response.body).to include('map')
    end
    # it 'indexアクションにリクエストするとレスポンスに投稿済みのツイートの画像URLが存在する' do
    #  get root_path
    #  expect(response.【B】).to include(【C】.image)
    # end
    # it 'indexアクションにリクエストするとレスポンスに投稿検索フォームが存在する' do
    #   get root_path
    #   expect(response.【B】).to 【D】('投稿を検索する')
    # end
  end
end
