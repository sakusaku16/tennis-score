import React, { useState, useEffect, useRef } from 'react';
import ActionCable from '@rails/actioncable';
import './App.css';

function App() {
  const [score, setScore] = useState({
    player1GameScore: 0,
    player2GameScore: 0,
    player1SetScore: 0,
    player2SetScore: 0,
    player1MatchScore: 0,
    player2MatchScore: 0,
    currentSet: 1,
    isDeuce: false,
    advantage: 0
  });
  const [connected, setConnected] = useState(false);
  const wsRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;

  useEffect(() => {
    const cleanup = connectWebSocket();
    return () => {
      if (cleanup) {
        cleanup();
      }
      if (wsRef.current) {
        wsRef.current.disconnect();
      }
    };
  }, []);

  const connectWebSocket = () => {
    const cableUrl = `ws://localhost:3000/cable`;
    
    try {
      const cable = ActionCable.createConsumer(cableUrl);
      wsRef.current = cable;

      const subscription = cable.subscriptions.create(
        { channel: 'ScoreChannel' },
        {
          connected: () => {
            console.log('WebSocket接続が開きました');
            setConnected(true);
            reconnectAttemptsRef.current = 0;
            fetchScore();
          },
          disconnected: () => {
            console.log('WebSocket接続が閉じました');
            setConnected(false);
            if (reconnectAttemptsRef.current < maxReconnectAttempts) {
              reconnectAttemptsRef.current++;
              setTimeout(connectWebSocket, 2000 * reconnectAttemptsRef.current);
            }
          },
          received: (data) => {
            if (data.type === 'score_update') {
              setScore(data.score);
            }
          }
        }
      );

      return () => {
        subscription.unsubscribe();
        cable.disconnect();
      };
    } catch (error) {
      console.error('WebSocket接続エラー:', error);
      setConnected(false);
      // HTTPフォールバック
      setInterval(fetchScore, 1000);
    }
  };

  const fetchScore = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/score');
      const data = await response.json();
      setScore(data);
    } catch (error) {
      console.error('スコア取得エラー:', error);
    }
  };

  const sendAction = async (action) => {
    try {
      const response = await fetch('http://localhost:3000/api/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score_action: action })
      });
      const data = await response.json();
      setScore(data);
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  const addPoint = (player) => {
    const action = player === 1 ? 'player1Point' : 'player2Point';
    sendAction(action);
  };

  const resetScore = () => {
    if (window.confirm('スコアをリセットしますか？')) {
      sendAction('reset');
    }
  };

  const getGameScoreDisplay = (player) => {
    const playerScore = player === 1 ? score.player1GameScore : score.player2GameScore;
    
    if (score.isDeuce) {
      if (score.advantage === player) {
        return 'AD';
      } else if (score.advantage !== 0) {
        return '40';
      } else {
        return '40';
      }
    }
    
    const scoreMap = { 0: '0', 1: '15', 2: '30', 3: '40' };
    return scoreMap[playerScore] || '0';
  };

  return (
    <div className="container">
      <header>
        <h1>🎾 テニススコア</h1>
      </header>
      
      <div className="score-board">
        {/* マッチスコア */}
        <div className="match-score">
          <div className="player-section">
            <div className="player-name">プレイヤー1</div>
            <div className="match-points">{score.player1MatchScore}</div>
          </div>
          <div className="vs">VS</div>
          <div className="player-section">
            <div className="player-name">プレイヤー2</div>
            <div className="match-points">{score.player2MatchScore}</div>
          </div>
        </div>
        
        {/* セットスコア */}
        <div className="set-score">
          <div className="set-label">セット <span>{score.currentSet}</span></div>
          <div className="set-points">
            <div className="set-point">{score.player1SetScore}</div>
            <div className="set-point">{score.player2SetScore}</div>
          </div>
        </div>
        
        {/* ゲームスコア */}
        <div className="game-score">
          <div className="game-points">
            <div className="game-point">{getGameScoreDisplay(1)}</div>
            <div className="game-point">{getGameScoreDisplay(2)}</div>
          </div>
          {score.isDeuce && (
            <div className="deuce-indicator">デュース</div>
          )}
        </div>
      </div>
      
      {/* コントロールボタン */}
      <div className="controls">
        <div className="player-controls">
          <button className="btn btn-player1" onClick={() => addPoint(1)}>
            プレイヤー1<br />ポイント
          </button>
          <button className="btn btn-player2" onClick={() => addPoint(2)}>
            プレイヤー2<br />ポイント
          </button>
        </div>
        <button className="btn btn-reset" onClick={resetScore}>
          リセット
        </button>
      </div>
      
      {/* 接続状態 */}
      <div className="connection-status">
        <span className={`status-indicator ${connected ? 'connected' : 'disconnected'}`}></span>
        <span>{connected ? '接続中' : '切断中'}</span>
      </div>
    </div>
  );
}

export default App;
