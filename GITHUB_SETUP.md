# GitHubリポジトリの作成手順

## エラーの原因

`Repository not found` エラーは、GitHub上にリポジトリが存在しないことを示しています。

## 解決方法

### 方法1: GitHubでリポジトリを作成する（推奨）

1. **GitHubにログイン**
   - https://github.com にアクセス

2. **新しいリポジトリを作成**
   - 右上の「+」アイコンをクリック
   - 「New repository」を選択

3. **リポジトリ情報を入力**
   - **Repository name**: `tennis-score`
   - **Description**: （任意）「リアルタイムテニススコアアプリ」
   - **Public** または **Private** を選択
   - **⚠️ 重要**: 「Initialize this repository with」のチェックは**すべて外す**
     - README、.gitignore、ライセンスは既にローカルにあるため

4. **「Create repository」をクリック**

5. **プッシュする**
   ```bash
   git push -u origin main
   ```

### 方法2: 既存のリポジトリがある場合

リポジトリ名が異なる場合、リモートURLを変更：

```bash
# 現在のリモートを確認
git remote -v

# リモートを削除
git remote remove origin

# 正しいURLでリモートを追加
git remote add origin https://github.com/yusaku/正しいリポジトリ名.git

# プッシュ
git push -u origin main
```

### 方法3: 認証エラーの場合

GitHubのPersonal Access Tokenが必要な場合：

1. **トークンを作成**
   - GitHub → Settings → Developer settings
   - Personal access tokens → Tokens (classic)
   - 「Generate new token (classic)」をクリック
   - Note: `tennis-score` など
   - Expiration: 適切な期間を選択
   - **Scopes**: `repo` にチェック
   - 「Generate token」をクリック
   - **トークンをコピー**（一度しか表示されません）

2. **プッシュ時にトークンを使用**
   ```bash
   git push -u origin main
   # Username: yusaku
   # Password: （トークンを貼り付け）
   ```

### 方法4: SSHを使用する場合

SSHキーを設定している場合：

```bash
# リモートをSSH URLに変更
git remote set-url origin git@github.com:yusaku/tennis-score.git

# プッシュ
git push -u origin main
```

## トラブルシューティング

### リポジトリ名の確認

GitHubで作成したリポジトリ名が `tennis-score` と完全に一致しているか確認してください。

### ユーザー名の確認

GitHubのユーザー名が `yusaku` で正しいか確認してください。

### 権限の確認

- リポジトリがPrivateの場合、適切な権限があるか確認
- 組織のリポジトリの場合、メンバーであることを確認
