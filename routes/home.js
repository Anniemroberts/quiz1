const Express = require('express');
const router = Express.Router()
//const app = Express();
const STORAGE = 'all_tweets';
let tweet_array = []

router.get('/', function (req, res) {
  res.render('homepage');
});

router.get('/dashboard', function (req, res, next) {
  if(!req.cookies.all_tweets) {
    res.render('dashboard', {all_tweets: ""});
  } else {
    let all_tweets = req.cookies.all_tweets;
    res.render('dashboard', {all_tweets});
  }
});

router.post('/dashboard', function(req, res, next) {
  const params = req.body;
  let tweet = params.tweet;
  let name = params.name;
  var archive = req.cookies.all_tweets ? req.cookies.all_tweets : "";
  //let tweet_array = []
  tweet_array.push({"name" : name, "tweet": tweet});
  if(archive != ""){getTweets(archive)};
  console.log(tweet_array);

  res.clearCookie('all_tweets');
  console.log("cookie cleared")
  let all_tweets = res.cookie("all_tweets", tweet_array, {maxAge: 300000});
  console.log("past new cookies")
  res.redirect('/dashboard', {all_tweets});
});

getTweets = function(cookies) {
  console.log(cookies)
  cookies.forEach(function(item){
    console.log(item);
    tweet_array.push(item);
  })
}


module.exports = router;
