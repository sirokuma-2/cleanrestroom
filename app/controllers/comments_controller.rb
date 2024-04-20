class CommentsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create]

  def new
    @post = Post.find_by(hash_id: params[:post_hashed_id])
    @comment = Comment.new
  end

  def create
    @post = Post.find_by(hash_id: params[:post_hashed_id])
    @comment = Comment.new(comment_params)
    if Comment.create(comment_params)
      redirect_to "/posts/#{@comment.post.hash_id}"
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:rating, :content, :post_id).merge(user_id: current_user.id)
  end
end
