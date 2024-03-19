require 'digest'

class PostsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :edit, :update, :destroy]
  before_action :set_gons, only: [:about, :index]
  before_action :set_post, only: [:show, :edit, :update]
  before_action :move_to_index, except: [:about, :index, :show, :new, :create]

  include Rails.application.routes.url_helpers

  def about
  end

  def index
  end

  def show
    @comment = Comment.new
    @comments = @post.comments.includes(:user).page(params[:page]).per(5)
    @comments_reviews = @post.comments.includes(:user)
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
                                            :powder_corner, :stroller_accessible,
                                            :image).merge(user_id: current_user.id)
    elsif params[:facility]
      params.require(:facility).permit(:name, :address, :content, :latitude, :longitude,
                                       :nursing_room, :anyone_toilet, :diaper_changing_station,
                                       :powder_corner, :stroller_accessible, :image)
    end
  end

  def set_gons
    gon.googlemap_key = ENV['GOOGLE_MAP_KEY']

    gon.current_userid = Digest::SHA256.hexdigest(current_user.id.to_s) if user_signed_in?

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
        comment: post.comments.map do |comment|
          {
            id: comment.id,
            post_id: comment.post_id,
            user_id: Digest::SHA256.hexdigest(comment.user_id.to_s),
            content: comment.content,
            created_at: comment.created_at,
            updated_at: comment.updated_at,
            rating: comment.rating
          }
        end,
        userId: Digest::SHA256.hexdigest(post.user.id.to_s)
      }
    end
  end

  def set_post
    @post = Post.find(params[:id])
  end

  def move_to_index
    return if user_signed_in? && current_user.id == Post.find(params[:id]).user_id

    redirect_to action: :index
  end
end
