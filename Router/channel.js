const express = require("express");
const router = express.Router();
const ChannelDomain = require("../Domain/channelDomain");
let channel = new ChannelDomain();

router
  .get("/", channel.getAllChannels)
  .post("/get", channel.getChannels)
  .post("/", channel.addChannel)
  .get("/:id", channel.getChannelById)
  .put("/:id", channel.updateChannel)
  .delete("/:id", channel.deleteChannel);

module.exports = router;
