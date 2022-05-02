const express = require("express");
const router = express.Router();
const TweetDomain = require("../Domain/tweetDomain");
let tweet = new TweetDomain();

router
  .get("/", tweet.getAllTweets)
  .get("/byUsers", tweet.getTweetByUser)
  .post("/byChannels", tweet.getTweetByChannels)
  .post("/", tweet.addTweet)
  .get("/:id", tweet.getTweetById)
  .put("/:id", tweet.updateTweet)
  .delete("/:id", tweet.deleteTweet)
  .post("/like/:id", tweet.likeTweet);

module.exports = router;
