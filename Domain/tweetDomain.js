const TweetModel = require("../Model/tweetModel");

module.exports = class TweetDomain {
  async getAllTweets(req, res) {
    try {
      let tweets = await TweetModel.find();
      res.send(tweets);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  async getTweetById(req, res) {
    try {
      let tweet = await TweetModel.findOne({ id: req.params.id });

      if (tweet.length == 0) {
        res.send(tweet);
      } else {
        res.status(204).send("No Such Tweet");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  async addTweet(req, res) {
    try {
      let tweet = new TweetModel(req.body);
      await tweet.save();
      res.send(tweet);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  async updateTweet(req, res) {
    try {
      let result = await TweetModel.updateOne(
        { id: id },
        { $set: { ...req.body } }
      );
      if (result.acknowledge == 0) {
        res.send("Updated Successfully");
      } else {
        res.send("Didn't find such tweet");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  async deleteTweet(req, res) {
    try {
      let result = await TweetModel.updateOne(
        { id: id },
        { $set: { status: false } }
      );
      if (result.acknowledge == 0) {
        res.send("Deleted Successfully");
      } else {
        res.send("Didn't find such tweet");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
};
