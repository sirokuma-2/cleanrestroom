class CommentsController < ApplicationController
  def new
    @post = Post.find(params[:post_id])
    @comment = Comment.new
  end

  def create
     @comment = Comment.new(comment_params)
    if Comment.create(comment_params)
      redirect_to "/posts/#{@comment.post.id}" # コメントと結びつくツイートの詳細画面に遷移する
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:rating, :content).merge(user_id: current_user.id, post_id: params[:post_id])
  end
end
