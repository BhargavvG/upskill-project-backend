const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

autoIncrement.initialize(mongoose.connection);

// model
const TweetModel = mongoose.model(
  "tweets",
  new mongoose.Schema({
    msg: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: Number,
      ref: "users",
    },
    likes: {
      type: Array,
    },
    createdOn: {
      type: Date,
      default: new Date(),
    },
    modifiedOn: {
      type: Date,
    },
    channels: {
      type: Array,
    },
    status: {
      type: Boolean,
      default: false,
    },
  }).plugin(autoIncrement.plugin, {
    model: "tweets",
    field: "id",
    startAt: 10005,
  })
);

module.exports = TweetModel;
