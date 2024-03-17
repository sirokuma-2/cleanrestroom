class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update]
  before_action :user_params, only: :create
  before_action :redirect_to_root_path, only: [:edit, :update]

  def show
    @posts = Post.includes(:user).where(user_id: @user.id).order('created_at DESC').page(params[:page]).per(5)
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to posts_path
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :imageName)
  end

  def set_user
    @user = User.find(params[:id])
  end

  def redirect_to_root_path
    redirect_to root_path if current_user.id != @user.id
  end
end
