class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit]

  def show

  end

  def edit
    puts @user.imageName.url
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
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
end
