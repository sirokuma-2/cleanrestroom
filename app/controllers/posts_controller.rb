class PostsController < ApplicationController
  def index
    gon.googlemap_key = ENV['GOOGLE_MAP_KEY']
    @posts = Post.includes(:facility).all

    gon.posts = @posts.map do |post|
      # Railsロガーを使用してデバッグ情報を出力
      Rails.logger.debug "Facility Name: #{post.facility.address}"

      {
        id: post.id,
        name: post.facility.name,
        address: post.facility.address,
        content: post.facility.content,
        latitude: post.facility.latitude,
        longitude: post.facility.longitude
      }
    end
  end

  def new
    @post = Post.new
    @latitude = params[:latitude]
    @longitude = params[:longitude]
  end

  def create
    @post = Post.new(post_params)
    puts @post
  end

  private
  def post_params
    params.require(:post).permit(:name, :address, :comment, :latitude , :longitude)
  end

end
