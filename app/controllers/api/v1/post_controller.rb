class Api::V1::PostController < ApplicationController
  def index
    post = Post.all.order(created_at: :desc)
    render json: post
  end

  def create
    post = Post.create!(post_params)
    if post
      render json: post
    else
      render json: post.errors
    end
  end

  def show
    if post
      render json: post
    else
      render json: post.errors
    end
  end

  def update
    # post = Post.update(post_params)
    post = Post.find(params[:id])
    post.update(post_params)
    if post
      render json: post
    else
      render json: post.errors
    end
  end

  def destroy
    post&.destroy
    render json: { message: 'Post deleted!' }
  end

  private

  def post_params
    params.permit(:username, :location, :description, :lat, :lng, :reference, :notes)
  end

  def post
    @post ||= Post.find(params[:id])
  end

end
