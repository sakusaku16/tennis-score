class ScoreService
  include Singleton

  def initialize
    @score = TennisScore.new
  end

  def current_score
    @score.to_json
  end

  def add_player1_point
    @score.add_player1_point
  end

  def add_player2_point
    @score.add_player2_point
  end

  def reset
    @score.reset
  end
end
