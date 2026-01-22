# SSH認証の設定手順

## ✅ 完了した作業

1. SSHキーを生成しました
2. 公開鍵をクリップボードにコピーしました

## 次のステップ: GitHubに公開鍵を追加

### 方法1: ブラウザで追加（推奨）

1. **GitHubにログイン**
   - https://github.com にアクセス

2. **SSH設定ページを開く**
   - https://github.com/settings/ssh/new に直接アクセス
   - または: Settings → SSH and GPG keys → New SSH key

3. **公開鍵を追加**
   - **Title**: `Mac - tennis-score` など（識別用の名前）
   - **Key**: クリップボードにコピー済みの公開鍵を貼り付け
     - 公開鍵は以下の形式です：
     ```
     ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIEwcEQrN0tIH95x91gmk2SNWVnnDgtx1dnHdBypNcas1 yusaku@github
     ```
   - **Key type**: Authentication Key（デフォルト）
   - **Add SSH key** をクリック

4. **確認**
   - パスワードを入力して確認

### 方法2: コマンドラインで確認

公開鍵がクリップボードにコピーされているか確認：

```bash
pbpaste
```

## 接続テスト

GitHubに公開鍵を追加した後、以下で接続をテスト：

```bash
ssh -T git@github.com
```

成功すると以下のメッセージが表示されます：
```
Hi yusaku! You've successfully authenticated, but GitHub does not provide shell access.
```

## プッシュ

接続テストが成功したら、以下でプッシュ：

```bash
git push -u origin main
```
