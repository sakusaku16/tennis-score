# テニススコアアプリ

リアルタイムでテニスのスコアを管理・表示するWebアプリケーションです。

## 機能

- **ゲームスコア管理**: 0, 15, 30, 40, アドバンテージの表示
- **セットスコア管理**: 各セットのゲーム数を記録
- **マッチスコア管理**: セット数の記録
- **リアルタイム更新**: Action Cable (WebSocket)を使用したリアルタイムスコア同期
- **レスポンシブデザイン**: モバイルデバイスにも対応

## 技術スタック

- **フロントエンド**: React.js 18, JavaScript (ES6+)
- **バックエンド**: Ruby on Rails 7.0 (API Mode)
- **リアルタイム通信**: Action Cable (WebSocket)
- **キャッシュ**: Redis
- **ビルドツール**: npm/yarn (フロントエンド), Bundler (バックエンド)

## セットアップ

### 前提条件

- Node.js (v16以上)
- Ruby (v3.2.0以上)
- Redis (WebSocket接続用)

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd tennis-score
```

### 2. バックエンド (Rails) のセットアップ

```bash
cd backend
bundle install
```

Redisを起動します：

```bash
# macOS (Homebrew)
brew services start redis

# Linux
sudo systemctl start redis

# または直接起動
redis-server
```

Railsサーバーを起動します：

```bash
rails server
```

サーバーは `http://localhost:3000` で起動します。

### 3. フロントエンド (React) のセットアップ

新しいターミナルで：

```bash
cd frontend
npm install
npm start
```

開発サーバーは `http://localhost:3001` で起動します（Reactのデフォルトポート）。

### 4. アプリケーションの使用

ブラウザで `http://localhost:3001` にアクセスしてアプリケーションを使用できます。

## 使い方

1. **ポイント追加**: 「プレイヤー1ポイント」または「プレイヤー2ポイント」ボタンをクリック
2. **スコアリセット**: 「リセット」ボタンをクリックしてスコアを初期化
3. **リアルタイム同期**: 複数のブラウザで同じURLを開くと、スコアがリアルタイムで同期されます

## スコアルール

- **ゲームスコア**: 0 → 15 → 30 → 40 → ゲーム獲得
- **デュース**: 40-40になった場合、デュース状態になります
- **アドバンテージ**: デュース後、2ポイント差をつけた方がゲームを獲得
- **セット**: 6ゲーム先取で2ゲーム差、または7-5でセット獲得
- **マッチ**: 通常は3セット先取（設定により変更可能）

## プロジェクト構造

```
tennis-score/
├── frontend/                 # React.jsフロントエンド
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js           # メインコンポーネント
│   │   ├── App.css           # スタイルシート
│   │   ├── index.js          # エントリーポイント
│   │   └── index.css
│   └── package.json
├── backend/                  # Ruby on Railsバックエンド
│   ├── app/
│   │   ├── channels/         # Action Cableチャンネル
│   │   │   └── score_channel.rb
│   │   ├── controllers/     # APIコントローラー
│   │   │   └── api/
│   │   │       └── scores_controller.rb
│   │   ├── models/          # モデル
│   │   │   └── tennis_score.rb
│   │   └── services/        # サービス
│   │       └── score_service.rb
│   ├── config/
│   │   ├── routes.rb        # ルーティング
│   │   └── cable.yml        # Action Cable設定
│   └── Gemfile
├── .gitignore
└── README.md
```

## API エンドポイント

### GET /api/score
現在のスコアを取得します。

**レスポンス例:**
```json
{
  "player1GameScore": 0,
  "player2GameScore": 0,
  "player1SetScore": 0,
  "player2SetScore": 0,
  "player1MatchScore": 0,
  "player2MatchScore": 0,
  "currentSet": 1,
  "isDeuce": false,
  "advantage": 0
}
```

### POST /api/score
スコアを更新します。

**リクエストボディ:**
```json
{
  "score_action": "player1Point" | "player2Point" | "reset"
}
```

## 開発

### フロントエンドのビルド

```bash
cd frontend
npm run build
```


## ライセンス

このプロジェクトは自由に使用・改変できます。
