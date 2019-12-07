class Api::PostsController < ApplicationController
  skip_before_action :authenticate_user, only: [:show]

  def index
    @posts = Post.with_attached_photos.where(author_id: current_user.id)
  end

  def show
  end

  def destroy
  end

  def create
  end

  def update
  end

  private

  def post_params
    params.require(:post).permit(:caption, :author_id, photos: [])
  end

end
