const mongoose = require('mongoose');

var followers_list = new mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    id: {
        type: String
    },
    created_at: {
        type: String
    }
});


var following_list = new mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    userid: {
        type: String
    },
    created_at: {
        type: String
    }
});


var tweetdata_list = new mongoose.Schema({
    username: {
        type: String
    },
    message: {
        type: String
    }
});




  
const following = mongoose.model("following", following_list);
const followers = mongoose.model("followers", followers_list);
const tweetdata = mongoose.model("tweetdata", tweetdata_list);
module.exports = {
    following,followers,tweetdata
  };
  
  