const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

autoIncrement.initialize(mongoose.connection);

// model
const UserModel = mongoose.model(
  "users",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    img: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
    },
    contactNumber: {
      type: Number,
      required: true,
      min: 0000000001,
      max: 9999999999,
    },
    dob: {
      type: Date,
    },

    password: {
      type: String,
      required: true,
      maxlength: 1024,
    },
    role: {
      type: String,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    createdOn: {
      type: Date,
      default: new Date(),
    },
    modifiedOn: {
      type: Date,
    },
  })
);

module.exports = UserModel;
