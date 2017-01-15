class Api::TaskersController < ApplicationController

  def index
    @taskers = Tasker.all
    if location
      @taskers = @taskers.where('location LIKE ?', "%#{location}")
    end
    if skill
      @taskers = @taskers.where('skill LIKE ?', "%#{skill}")
    end
    # if autobook
    #   @taskers = @taskers.where('auto_book LIKE ?', true)
    # end

    render :index
  end

  def location
    params[:location]
  end

  def skill
    params[:skill]
  end

  # def autobook
  #   params[:autobook]
  # end

end