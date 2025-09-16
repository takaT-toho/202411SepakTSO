## Windowsローカル環境での実行手順

### 1. 必要なソフトウェアの準備
- Node.js 20.x (LTS) をインストールし、node -v と npm -v で動作を確認する
- MySQL Community Server 8.0 をインストールし、サービスを起動する (MySQL Installer や WSL 上の MySQL など任意の方法)
- Git (任意) をインストールし、プロジェクトを取得できるようにする

### 2. リポジトリと依存関係のセットアップ
1. PowerShell または Windows Terminal でプロジェクトフォルダ (202411SepakTSO) に移動する
2. 必要に応じて git clone でリポジトリを取得するか、既存のフォルダを開く
3. npm install を実行し、package.json の依存関係 (express / mysql2 など) をインストールする

### 3. 環境変数ファイルの作成
プロジェクトルートに .env を作成し、接続情報を記載する。ポートは任意に変更できる。

PORT=3000
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_DATABASE=sendai


### 4. データベースの初期化
1. MySQL に管理ユーザーで接続し、アプリケーション用ユーザー (例: your_mysql_user) を作成する
2. プロジェクト直下の initDatabase.sql を実行して初期データベースとテーブルをセットアップする
   - 例: mysql -u your_mysql_user -p < initDatabase.sql (MySQL Shell を利用する場合は source initDatabase.sql)
3. DB_DATABASE に指定したデータベース (例: sendai) にテーブルが作成されていることを確認する

### 5. アプリケーションの起動
1. .env を保存した状態で node app.js を実行する
2. コンソールに Server is running on http://localhost:3000 が表示されれば起動完了
3. ブラウザで http://localhost:3000 にアクセスし、画面や API が表示されることを確認する
4. 終了する場合は起動したターミナルで Ctrl + C を押す

### 6. トラブルシューティングのヒント
- MySQL 接続エラーが出る場合は、.env のホスト名 / ユーザー / パスワード / データベース名を再確認する
- PORT を他のアプリが使用している場合は .env の PORT を変更し、ブラウザのアクセス先も合わせて変更する
- 依存関係に問題がある場合は node_modules を削除し、再度 　npm install を実行する

#### セキュリティグループ設定
SSHとWebとMySQLを入れる

#### TeraTermなどでVPSにSSH接続する

参考：https://www.liquidweb.com/blog/node-js-on-vps/
#### VPSをアップデートする(5分)
`sudo apt update`
`sudo apt upgrade`

#### Node.jsをインストールする
`sudo apt install curl`
`curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -`
`sudo apt-get install -y nodejs`
`node --version`
-> v20.18.0
`npm --version`
-> 10.8.2
`npm install -g npm@10.9.0`
`npm install express`
`npm install dotenv`

#### MySQLのインストール&初期設定
`sudo apt install mysql-server-8.0`
`mysql --version`
`sudo service mysql start`
`sudo mysql -u root`
`CREATE USER 'your_use_name'@'localhost' IDENTIFIED BY 'your_password';`
`GRANT ALL PRIVILEGES ON * . * TO 'your_use_name'@'localhost';`
`CREATE USER 'your_use_name'@'%' IDENTIFIED BY 'your_password';`
`GRANT ALL PRIVILEGES ON *.* TO 'your_use_name'@'%' WITH GRANT OPTION;`
`FLUSH PRIVILEGES;`
`quit`
`mysql -u sendaiuser -p`

#### MySQLを別のネットワークからもアクセス出来るようにする
/etc/mysql/mysql.conf.d/mysqld.cnf のファイルを変更する
```
- bind-address = 127.0.0.1
+ bind-address = 0.0.0.0 (またはその他の特定のIPアドレス)
```

再起動：
`sudo systemctl restart mysql`

#### ファイアウォール設定
`sudo ufw allow 80/tcp`
`sudo ufw allow 443/tcp`
`sudo ufw allow 3306`

#### フォルダおよびファイルを作成する
`mkdir project`
`cd project`
`vi app.js`

#### nginxの設定
`sudo apt install nginx`
`sudo vi /etc/nginx/sites-available/default`
```
server {
	listen 80;
	server_name example.com(or ip address);
	
	location / {
		proxy_pass http://localhost:3000;
		proxy_http_version 1.1;
		proxy_set_haeder Upgrade $http_upgrade;
		proxy_set_header Connection 'upgrade';
		proxy_set_header Host $host;
		proxy_cache_bypass $http_upgrade;
	}
}
```
`sudo systemctl restart nginx`


#### SSL証明書の取得
`sudo apt install certbot python3-certbot-nginx`
`sudo certbot --nginx -d example.com`

#### PM2 process managerをインストールする
`sudo npm install -g pm2`

#### Node.js appを起動する(app.jsがある階層で)
`pm2 start app.js`

#### appを停止する
`pm2 stop app.js`

#### 起動中のアプリを一覧で見る
`pm2 list`

#### アプリのログを見る
`pm2 logs app`
