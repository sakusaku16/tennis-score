# Gitにアップロードする手順

## 1. ファイルをステージング（追加）する

すべてのファイルをGitに追加します：

```bash
git add .
```

特定のファイルやディレクトリだけを追加する場合：

```bash
git add .gitignore
git add README.md
git add frontend/
git add backend/
```

## 2. コミットする

変更をコミットします：

```bash
git commit -m "Initial commit: React.js + Ruby on Rails テニススコアアプリ"
```

コミットメッセージは変更内容を説明するものに変更できます。

## 3. リモートリポジトリを作成（GitHub/GitLabなど）

### GitHubの場合

1. GitHubにログイン
2. 右上の「+」→「New repository」をクリック
3. リポジトリ名を入力（例: `tennis-score`）
4. 「Create repository」をクリック

### GitLabの場合

1. GitLabにログイン
2. 「New project」→「Create blank project」をクリック
3. プロジェクト名を入力
4. 「Create project」をクリック

## 4. リモートリポジトリを追加

GitHubの場合：

```bash
git remote add origin https://github.com/ユーザー名/tennis-score.git
```

GitLabの場合：

```bash
git remote add origin https://gitlab.com/ユーザー名/tennis-score.git
```

SSHを使用する場合：

```bash
git remote add origin git@github.com:ユーザー名/tennis-score.git
```

## 5. ブランチ名を確認・変更（必要に応じて）

現在のブランチ名を確認：

```bash
git branch
```

ブランチ名を変更する場合（例: `main`に変更）：

```bash
git branch -M main
```

## 6. プッシュする

リモートリポジトリにアップロード：

```bash
git push -u origin main
```

初回のみ `-u` オプションが必要です。2回目以降は：

```bash
git push
```

## 今後の更新手順

コードを変更した後は、以下のコマンドで更新できます：

```bash
# 変更を確認
git status

# 変更をステージング
git add .

# コミット
git commit -m "変更内容の説明"

# プッシュ
git push
```

## トラブルシューティング

### 認証エラーが発生する場合

GitHubのPersonal Access Tokenを使用する必要があります：

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 「Generate new token」をクリック
3. 必要な権限を選択（`repo`）
4. トークンをコピー
5. パスワードの代わりにトークンを使用

### リモートリポジトリを変更する場合

```bash
# 現在のリモートを確認
git remote -v

# リモートを削除
git remote remove origin

# 新しいリモートを追加
git remote add origin 新しいリポジトリURL
```
