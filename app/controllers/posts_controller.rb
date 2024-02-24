class PostsController < ApplicationController
  include Rails.application.routes.url_helpers

  def index
    gon.googlemap_key = ENV['GOOGLE_MAP_KEY']
    @posts = Post.includes(:facility).all

    gon.posts = @posts.map do |post|
      # Railsロガーを使用してデバッグ情報を出力
      Rails.logger.debug "Facility Name: #{post.facility.address}"
      image_url = url_for(post.facility.image.url)
      puts image_url # 画像のURLをコンソールに出力
      {
        id: post.id,
        name: post.facility.name,
        address: post.facility.address,
        content: post.facility.content,
        latitude: post.facility.latitude,
        longitude: post.facility.longitude,
        image: url_for(post.facility.image.url)
      }
    end
  end

  def new
    @post_facility = PostFacility.new
    @latitude = params[:latitude]
    @longitude = params[:longitude]
  end

  def create
    @post_facility = PostFacility.new(post_params)
    if @post_facility.save
      redirect_to posts_path, notice: '投稿が成功しました。'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @post = Post.find(params[:id])
    @facility = @post.facility
  end

  def update
    @post = Post.find(params[:id])
    @facility = @post.facility
    if @facility.update(post_params)
      redirect_to posts_path, notice: '投稿を編集しました。'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    post = Post.find(params[:id])
    post.destroy
    redirect_to posts_path
  end

  private

  def post_params
    if params[:post_facility]
      params.require(:post_facility).permit(:name, :address, :content, :latitude, :longitude, :image)
    elsif params[:facility]
      params.require(:facility).permit(:name, :address, :content, :latitude, :longitude, :image)
    end
  end
end
