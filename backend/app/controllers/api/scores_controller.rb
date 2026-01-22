module Api
  class ScoresController < ApplicationController
    def show
      render json: ScoreService.instance.current_score
    end

    def update
      score_action = params[:action] || params[:score_action]
      
      case score_action
      when 'player1Point'
        ScoreService.instance.add_player1_point
      when 'player2Point'
        ScoreService.instance.add_player2_point
      when 'reset'
        ScoreService.instance.reset
      end

      score = ScoreService.instance.current_score
      
      # Action Cableでブロードキャスト
      ActionCable.server.broadcast('score', {
        type: 'score_update',
        score: score
      })

      render json: score
    end
  end
end
