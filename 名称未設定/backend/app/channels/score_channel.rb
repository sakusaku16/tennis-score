class ScoreChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'score'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
