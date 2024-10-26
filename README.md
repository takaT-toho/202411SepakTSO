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
