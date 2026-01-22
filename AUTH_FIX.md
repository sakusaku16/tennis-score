# GitHub認証エラーの解決方法

## 問題

リポジトリは存在するのに `Repository not found` エラーが出る場合、認証の問題です。

GitHubは2021年8月以降、パスワード認証を廃止し、**Personal Access Token (PAT)** が必要になりました。

## 解決方法

### 方法1: Personal Access Tokenを作成して使用（推奨）

#### ステップ1: トークンを作成

1. GitHubにログイン
2. 右上のプロフィールアイコン → **Settings**
3. 左メニューの一番下 → **Developer settings**
4. **Personal access tokens** → **Tokens (classic)**
5. **Generate new token** → **Generate new token (classic)**
6. 以下を設定：
   - **Note**: `tennis-score-push` など（メモ用）
   - **Expiration**: 適切な期間を選択（例: 90 days）
   - **Scopes**: `repo` にチェック（すべてのリポジトリへのアクセス）
7. **Generate token** をクリック
8. **⚠️ 重要**: トークンをコピー（一度しか表示されません）

#### ステップ2: トークンを使用してプッシュ

```bash
git push -u origin main
```

プロンプトが表示されたら：
- **Username**: `yusaku`
- **Password**: （トークンを貼り付け）

### 方法2: SSH認証を使用する

#### ステップ1: SSHキーを確認

```bash
ls -la ~/.ssh/id_*.pub
```

SSHキーがない場合、作成：

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

#### ステップ2: SSHキーをGitHubに追加

1. 公開鍵をコピー：
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

2. GitHub → Settings → SSH and GPG keys → New SSH key
3. コピーした公開鍵を貼り付け
4. 「Add SSH key」をクリック

#### ステップ3: リモートURLをSSHに変更

```bash
git remote set-url origin git@github.com:yusaku/tennis-score.git
```

#### ステップ4: プッシュ

```bash
git push -u origin main
```

### 方法3: GitHub CLIを使用する

```bash
# GitHub CLIをインストール（未インストールの場合）
brew install gh

# 認証
gh auth login

# プッシュ
git push -u origin main
```

## 認証情報のキャッシュをクリア

以前の認証情報がキャッシュされている場合：

```bash
# macOSの場合
git credential-osxkeychain erase
host=github.com
protocol=https

# または
git config --global --unset credential.helper
git config --global credential.helper osxkeychain
```

## 確認方法

認証が成功したか確認：

```bash
# リモートリポジトリの情報を取得
git ls-remote origin

# または
git fetch origin
```

## トラブルシューティング

### トークンが無効な場合

- トークンの有効期限を確認
- 新しいトークンを作成
- `repo` スコープが選択されているか確認

### リポジトリがPrivateの場合

- トークンに `repo` スコープが必要
- リポジトリへのアクセス権限があるか確認

### 組織のリポジトリの場合

- 組織のメンバーであることを確認
- 組織のSSO認証が必要な場合がある
