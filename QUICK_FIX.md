# クイック修正ガイド

## 現在の状況

リモートURLをSSHに変更しました。次は以下のいずれかを実行してください。

## オプション1: SSH認証を使用（推奨）

### SSHキーがある場合

```bash
# プッシュを試す
git push -u origin main
```

### SSHキーがない場合

1. **SSHキーを生成**:
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   # Enterキーを3回押す（デフォルト設定でOK）
   ```

2. **公開鍵をコピー**:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   # または
   pbcopy < ~/.ssh/id_ed25519.pub  # macOSの場合
   ```

3. **GitHubに追加**:
   - https://github.com/settings/ssh/new にアクセス
   - コピーした公開鍵を貼り付け
   - 「Add SSH key」をクリック

4. **接続をテスト**:
   ```bash
   ssh -T git@github.com
   # "Hi yusaku! You've successfully authenticated..." と表示されればOK
   ```

5. **プッシュ**:
   ```bash
   git push -u origin main
   ```

## オプション2: Personal Access Tokenを使用

SSHが使えない場合：

1. **リモートURLをHTTPSに戻す**:
   ```bash
   git remote set-url origin https://github.com/yusaku/tennis-score.git
   ```

2. **Personal Access Tokenを作成**:
   - https://github.com/settings/tokens/new
   - Note: `tennis-score`
   - Expiration: 適切な期間
   - **Scopes**: `repo` にチェック
   - 「Generate token」をクリック
   - トークンをコピー

3. **認証情報を設定**:
   ```bash
   git config --global credential.helper osxkeychain
   ```

4. **プッシュ（トークンを入力）**:
   ```bash
   git push -u origin main
   # Username: yusaku
   # Password: （トークンを貼り付け）
   ```

## オプション3: GitHub CLIを使用

```bash
# GitHub CLIをインストール
brew install gh

# 認証
gh auth login

# プッシュ
git push -u origin main
```
