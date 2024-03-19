require 'rails_helper'
describe PostsController, type: :request do
  # before do
  #   @tweet = FactoryBot.create(:post)
  # end

  describe 'GET postコントローラー' do
    it 'indexアクションにリクエストすると正常にレスポンスが返ってくる' do
      get root_path
      # binding.pry
      expect(response.status).to eq(200)
    end
    it 'aboutアクションにリクエストすると正常にレスポンスが返ってくる' do
      get about_path
      expect(response.status).to eq(200)
    end
    it 'indexアクションにリクエストするとレスポンスにマップが存在する' do
      get root_path
      expect(response.body).to include('map')
    end
    it 'aboutアクションにリクエストするとレスポンスにマップが存在する' do
      get about_path
      expect(response.body).to include('top-map')
    end
  end
end
