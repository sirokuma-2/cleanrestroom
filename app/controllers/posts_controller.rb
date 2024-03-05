class PostsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :edit, :update, :destroy]
  before_action :set_post, only: [:show, :edit, :update]

  include Rails.application.routes.url_helpers

  def top
    gon.googlemap_key = ENV['GOOGLE_MAP_KEY']

    @posts = Post.includes(:facility).all
    gon.posts = @posts.map do |post|
      {
        id: post.id,
        name: post.facility.name,
        address: post.facility.address,
        content: post.facility.content,
        latitude: post.facility.latitude,
        longitude: post.facility.longitude,
        anyone_toilet: post.facility.anyone_toilet,
        diaper_changing_station: post.facility.diaper_changing_station,
        powder_corner: post.facility.powder_corner,
        stroller_accessible: post.facility.stroller_accessible,
        image: url_for(post.facility.image.url)
      }
    end
  end

  def index
    gon.googlemap_key = ENV['GOOGLE_MAP_KEY']

    @posts = Post.includes(:facility).all
    gon.posts = @posts.map do |post|
      {
        id: post.id,
        name: post.facility.name,
        address: post.facility.address,
        content: post.facility.content,
        latitude: post.facility.latitude,
        longitude: post.facility.longitude,
        nursing_room: post.facility.nursing_room,
        anyone_toilet: post.facility.anyone_toilet,
        diaper_changing_station: post.facility.diaper_changing_station,
        powder_corner: post.facility.powder_corner,
        stroller_accessible: post.facility.stroller_accessible,
        image: url_for(post.facility.image.url),
        comment: post.comments
      }
    end
  end

  def show
    @comment = Comment.new
    @comments = @post.comments.includes(:user)
  end

  def new
    @post_facility = PostFacility.new
    @latitude = params[:latitude]
    @longitude = params[:longitude]
  end

  def create
    @post_facility = PostFacility.new(post_params)
    if @post_facility.save
      redirect_to posts_path
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @facility = @post.facility
  end

  def update
    @facility = @post.facility
    if @facility.update(post_params)
      redirect_to posts_path
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
      params.require(:post_facility).permit(:name, :address, :content, :latitude, :longitude,
                                            :nursing_room, :anyone_toilet, :diaper_changing_station,
                                            :powder_corner,:stroller_accessible,
                                            :image).merge(user_id: current_user.id)
    elsif params[:facility]
      params.require(:facility).permit(:name, :address, :content, :latitude, :longitude,
                                       :nursing_room, :anyone_toilet, :diaper_changing_station,
                                       :powder_corner,:stroller_accessible, :image)
    end
  end

  def set_post
    @post = Post.find(params[:id])
  end
end
