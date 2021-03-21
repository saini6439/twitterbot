# twitterbot

## Local setup instructions
+ Clone the project from source
```shell
git clone https://github.com/saini6439/twitterbot.git
```
+ Intall NPM packages
```shell
npm install
```
Configure mongodb in server.js file
```shell
in my case it's mongodb://localhost:27017/scraper
host: localhost
database name: twitter
port: 27017
```
Add details into config/default.json file
```shell
{
    "consumer_key": "enter your key",
    "consumer_secret": "enter your secret key",
    "access_token_key": "enter your token key",
    "access_token_secret": "enter your secret key",
    "bearer_token":"enter bearer token",
    "userid":"enter your userid",
    "username":"enter your username"
    }
// find your user id using https://codeofaninja.com/tools/find-twitter-id/ website link
```

Now Start application
```shell
npm start
```

