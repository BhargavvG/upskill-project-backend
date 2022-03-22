const mongoose = require("mongoose");

// model
const UserModel = mongoose.model(
  "users",
  new mongoose.Schema({
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    displayName: {
      type: String,
      required: true,
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
    gender: {
      type: String,
      required: true,
      uppercase: true,
      enum: ["MALE", "FEMALE", "OTHERS"],
    },
    password: {
      type: String,
      required: true,
      maxlength: 1024,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user", "seller"],
    },
    addresses: [
      {
        type: new mongoose.Schema({
          name: {
            type: String,
            required: true,
          },
          phone: {
            type: Number,
            required: true,
            min: 0000000001,
            max: 9999999999,
          },
          address: {
            type: String,
            required: true,
          },

          pincode: {
            type: Number,
            required: true,
            match: /^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$/,
          },
          town: {
            type: String,
            required: true,
          },
          city: {
            type: String,
            required: true,
          },
          state: {
            type: String,
            required: true,
          },
        }),
      },
    ],
    activeStatus: {
      type: Boolean,
      default: true,
    },
  })
);

module.exports = UserModel;
