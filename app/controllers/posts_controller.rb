class PostsController < ApplicationController
  def top
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
        longitude: post.facility.longitude
      }
    end
  end
end
