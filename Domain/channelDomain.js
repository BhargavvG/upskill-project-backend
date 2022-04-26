const ChannelModel = require("../Model/channelModel");

module.exports = class ChannelDomain {
  async getAllChannels(req, res) {
    try {
      let channels = await ChannelModel.find();

      res.send(channels);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  async getChannelById(req, res) {
    try {
      let channel = await ChannelModel.findOne({ id: req.params.id });

      if (channel.length == 0) {
        res.send(channel);
      } else {
        res.status(204).send("No Such channel");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  async addChannel(req, res) {
    try {
      let channel = new ChannelModel(req.body);
      await channel.save();
      res.send(channel);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  async updateChannel(req, res) {
    try {
      let result = await ChannelModel.updateOne(
        { id: id },
        { $set: { ...req.body } }
      );
      if (result.acknowledge == 0) {
        res.send("Updated Successfully");
      } else {
        res.send("Didn't find such channel");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  async deleteChannel(req, res) {
    try {
      let result = await ChannelModel.updateOne(
        { id: id },
        { $set: { status: false } }
      );
      if (result.acknowledge == 0) {
        res.send("Deleted Successfully");
      } else {
        res.send("Didn't find such channel");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
};
ChannelModel.updateMany({ __v: 0 }, { $set: { url: "./public" } });
