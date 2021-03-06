class Api::TasksController < ApplicationController

  def create
    @task = Task.new(task_params)
    @task.user_id = current_user.id
    if @task.save
      render json: @task
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  def index
    @tasks = Task.joins(:tasker).where("user_id = ?", current_user.id)
    # sleep 2 -- test for loading spinner on the dashboard
    render :index
  end

  def destroy
    @task = Task.find_by_id(params[:id])
    @task.delete
    render json: @task
  end


  def task_params
    params.require(:task).permit(:tasker_id, :user_id, :description, :date, :location, :status)
  end

end
