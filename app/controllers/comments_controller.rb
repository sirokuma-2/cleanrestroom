class CommentsController < ApplicationController
  def index
  end

  def create
    comment = Comment.create(comment_params)
    redirect_to "/posts/#{comment.post.id}"  # コメントと結びつくツイートの詳細画面に遷移する
  end

  private
  def comment_params
    params.require(:comment).permit(:content).merge(user_id: current_user.id, post_id: params[:post_id])
  end
end
