
// Set up your search parameters

const Get_tweets=(sname)=>{
    var params = {screen_name: sname};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for(let i=0;i<tweets.length;i++)
            {
                console.log(tweets[i]['text']);
            }
          
        }
      });
}

const followSomeone=()=>{
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
        console.log("into search twiiter");
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


client.get('followers/list', function(err, data) {

    if (err) {
        console.log(err);
        return;
    }
    for(let i=0;i<data.users.length;i++){
        console.log("total followers : " + data.users[0].screen_name);
        Get_tweets(data.users[0].screen_name,data.users[0].ids);
    }
})

