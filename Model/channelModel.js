const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

autoIncrement.initialize(mongoose.connection);

// model
const ChannelModel = mongoose.model(
  "channels",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    createdOn: {
      type: Date,
      default: new Date(),
    },
    url: {
      type: String,
    },
  }).plugin(autoIncrement.plugin, {
    model: "channels",
    field: "id",
    startAt: 1100,
  })
);

module.exports = ChannelModel;
