const TweetModel = require("../Model/tweetModel");

module.exports = class TweetDomain {
  async getAllTweets(req, res) {
    try {
      let tweets = await TweetModel.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        {
          $project: {
            "user.password": false,
          },
        },
      ]);
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
      console.log(err.message);
      res.status(500).send(err.message);
    }
  }
  async getTweetByUser(req, res) {
    try {
      let tweets = await TweetModel.find({ user: req.decoded.id });
      res.send(tweets);
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    }
  }
  async getTweetByChannels(req, res) {
    let { selectedChannels } = req.body;
    console.log(selectedChannels);
    try {
      let tweets = await TweetModel.find({
        channels: { $in: selectedChannels },
      });
      res.send(tweets);
    } catch (err) {
      console.log(err.message);
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
  async likeTweet(req, res) {
    try {
      let tweet = await TweetModel.findOne({ id: req.params.id });
      let likes = tweet.likes;
      console.log(likes);
      console.log(req.decoded.id);
      if (tweet.likes.includes(req.decoded.id)) {
        likes = tweet.likes.filter((x) => x !== req.decoded.id);
      } else {
        likes.push(req.decoded.id);
      }
      let result = await TweetModel.updateOne(
        { id: req.params.id },
        { $set: { likes: likes } }
      );
      console.log(result);
      if (result.acknowledged) {
        res.status(200).send("Liked");
      } else res.status(204).send("something went wrong");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
};
