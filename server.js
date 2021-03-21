const needle = require('needle');
config = require('config');
var Twitter = require('twitter');
const mongoose = require('mongoose');
const express = require("express");
const app = express();
const server = require("http").Server(app);

const {following,followers,tweetdata} = require('./models/index')

// connection with mongo db
const dburl = "mongodb://localhost:27017/twitter";
mongoose.connect(dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

  var username = config.get('username');

var client = new Twitter({
    consumer_key: config.get('consumer_key'),
    consumer_secret: config.get('consumer_secret'),
    access_token_key: config.get('access_token_key'),
    access_token_secret: config.get('access_token_secret'),
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
  })
list=[]
const userId = config.get('userid');
const urlfs = `https://api.twitter.com/2/users/${userId}/followers`;
const urlfg = `https://api.twitter.com/2/users/${userId}/following`;
const bearerToken = config.get('bearer_token');


const getData = async (url,type) => {
    let users = [];
    let params = {
        "max_results": 1000,
        "user.fields": "created_at"
    }

    const options = {
        headers: {
            "User-Agent": "v2FollowingJS",
            "Authorization": `Bearer ${bearerToken}`
        }
    }

    let hasNextPage = true;
    let nextToken = null;
    console.log("Retrieving users this user is following...");
    while (hasNextPage) {
        let resp = await getPage(url,params, options, nextToken);
        if (resp && resp.meta && resp.meta.result_count && resp.meta.result_count > 0) {
            if (resp.data) {
                users.push.apply(users, resp.data);
            }
            if (resp.meta.next_token) {
                nextToken = resp.meta.next_token;
            } else {
                hasNextPage = false;
            }
        } else {
            hasNextPage = false;
        }
    }
    //console.log(users)
    const random = Math.floor(Math.random() * users.length);
    //console.log(random, users[random].username);
    if(type=="followingrep") tweetuser(users[random].username);
    return users

}

const getPage = async (url,params, options, nextToken) => {
    if (nextToken) {
        params.next_token = nextToken;
    }

    try {
        const resp = await needle('get', url, params, options);

        if (resp.statusCode != 200) {
            console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
            return;
        }
        return resp.body;
    } catch (err) {
        throw new Error(`Request failed: ${err}`);
    }
}


// Add new tweet with Hashtag user
const tweetuser=(usename)=>{
    let user=usename;
    // add your messgae here
    let mdata=`Good evening #${user}`
    client.post('statuses/update', { status: mdata }, function(err, data, response) {
        if(!err){
            tdata=new tweetdata()
            tdata.username=username;
            tdata.message=mdata;
            tdata.save((err, doc) => {
            });


        }
      //console.log(data)
    })
}


// saved followers into database
save_followers = async ()=>{
   let rest = await getData(urlfs,"followers");
    rest.forEach(element => {
        flg = new followers();
        flg.name=element.name;
        flg.username=element.username;
        flg.userid=element.id;
        flg.created_at=element.created_at;
        flg.save((err, doc) => {
        });
        Get_tweets(element.username);
    });
    
}



// saved followings into database
 save_following = async ()=>{
    let rest = await getData(urlfg,"following");
    rest.forEach(element => {
        flg = new following();
        flg.name=element.name;
        flg.username=element.username;
        flg.userid=element.id;
        flg.created_at=element.created_at;
        flg.save((err, doc) => {
        });

    });
    
}


// follow someone using this function change q : #cricket to any tranding thing
const followSomeone=()=>{
    var param_search = {
        q: '#cricket',
        count: 10,
        result_type: 'popular',
        lang: 'en'
      }
    
    // Initiate your search using the above paramaters
    client.get('search/tweets', param_search, function(err, data, response) {
        // If there is no error, proceed
       
        if(!err){
            console.log(data.statuses.length);
          // Loop through the returned tweets
          for(let i = 0; i < data.statuses.length; i++){
            // Get the screen_name from the returned data
            let screen_name = data.statuses[i].user.screen_name;
            // THE FOLLOWING MAGIC GOES HERE
            client.post('friendships/create', {screen_name}, function(err, response){
              if(err){
                console.log(err);
              } else {
                console.log(screen_name, ': **FOLLOWED**');
              }
            });
          }
        } else {
          console.log(err);
        }
      })
    
    }

    // get tweets of follower
    const Get_tweets=(sname)=>{
        var params = {screen_name: sname};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                for(let i=0;i<tweets.length;i++)
                {
                    console.log(tweets[i]['text']);
                    tdata=new tweetdata()
                    tdata.username=sname
                    tdata.message=tweets[i]['text'];
                    tdata.save((err, doc) => {
                    });
                }
              
            }
          });
    }

    // API end point for fetching all users
    app.get("/", (req, res) => {
        let rest=[];
        tweetdata.find({}, function(err, docs) {
            if (!err) { 
                res.end(JSON.stringify(docs))
                
            }
            else {
                throw err;
            }
        });
      });
      
    
followSomeone();
save_following();
save_followers();
Get_tweets(username)
// getData(urlfg,"followingrep");
const timer =()=>{
    getData(urlfg,"followingrep")
}
setInterval(timer, 60000*30);

server.listen(process.env.PORT || 3030);

