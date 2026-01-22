class TennisScore
  attr_accessor :player1_game_score, :player2_game_score,
                :player1_set_score, :player2_set_score,
                :player1_match_score, :player2_match_score,
                :current_set, :is_deuce, :advantage

  def initialize
    @player1_game_score = 0
    @player2_game_score = 0
    @player1_set_score = 0
    @player2_set_score = 0
    @player1_match_score = 0
    @player2_match_score = 0
    @current_set = 1
    @is_deuce = false
    @advantage = 0
  end

  def add_player1_point
    if @is_deuce
      if @advantage == 2
        @advantage = 0
      elsif @advantage == 0
        @advantage = 1
      else
        win_game(1)
      end
    else
      if @player1_game_score < 3
        @player1_game_score += 1
      else
        if @player2_game_score == 3
          @is_deuce = true
        else
          win_game(1)
        end
      end
    end
  end

  def add_player2_point
    if @is_deuce
      if @advantage == 1
        @advantage = 0
      elsif @advantage == 0
        @advantage = 2
      else
        win_game(2)
      end
    else
      if @player2_game_score < 3
        @player2_game_score += 1
      else
        if @player1_game_score == 3
          @is_deuce = true
        else
          win_game(2)
        end
      end
    end
  end

  def win_game(player)
    if player == 1
      @player1_set_score += 1
    else
      @player2_set_score += 1
    end

    reset_game_score
    check_set_end
  end

  def reset_game_score
    @player1_game_score = 0
    @player2_game_score = 0
    @is_deuce = false
    @advantage = 0
  end

  def check_set_end
    if (@player1_set_score >= 6 && @player1_set_score - @player2_set_score >= 2) ||
       (@player1_set_score == 7 && @player2_set_score == 5)
      @player1_match_score += 1
      next_set
    elsif (@player2_set_score >= 6 && @player2_set_score - @player1_set_score >= 2) ||
          (@player2_set_score == 7 && @player1_set_score == 5)
      @player2_match_score += 1
      next_set
    end
  end

  def next_set
    @current_set += 1
    @player1_set_score = 0
    @player2_set_score = 0
  end

  def reset
    @player1_game_score = 0
    @player2_game_score = 0
    @player1_set_score = 0
    @player2_set_score = 0
    @player1_match_score = 0
    @player2_match_score = 0
    @current_set = 1
    @is_deuce = false
    @advantage = 0
  end

  def to_json
    {
      player1GameScore: @player1_game_score,
      player2GameScore: @player2_game_score,
      player1SetScore: @player1_set_score,
      player2SetScore: @player2_set_score,
      player1MatchScore: @player1_match_score,
      player2MatchScore: @player2_match_score,
      currentSet: @current_set,
      isDeuce: @is_deuce,
      advantage: @advantage
    }
  end
end
