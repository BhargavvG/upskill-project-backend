const UserModel = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = class UserDomain {
  // Login user
  async loginUser(req, res) {
    const id = req.body.id;
    const password = req.body.password;
    try {
      let userdata = await UserModel.findOne({ id: id });
      if (!userdata) {
        return res.status(204).send("User not found");
      }
      const validPassword = await bcrypt.compare(password, userdata.password);
      if (validPassword) {
        let { password, ...user } = userdata;
        if (user.length == 0) {
          res.status(404).send("Login Failed!! User not found");
        } else {
          let token = jwt.sign(user, process.env.SECRETKEY, {
            expiresIn: "15d",
            algorithm: process.env.ALGORITHM,
          });
          res.status(200).json({
            message: "login successful",
            token: token,
          });
        }
      } else {
        res.status(205).send("Login Failed! Please enter correct password");
      }
    } catch (err) {
      res.status(500).send(err.message);
      return;
    }
  }

  // add user
  async addUser(req, res) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      let userdata = req.body;
      userdata.password = hashedPassword;
      userdata.role = "user";
      const user = new UserModel(userdata);

      await user.save();

      res.send("User Added");
    } catch (err) {
      res.status(208).send(err.message);
    }
  }

  // get all users
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.find();
      res.send(users);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  // get user by Id
  async getUserProfile(req, res) {
    const id = req.decoded.id;
    const user = await UserModel.findOne({ id: id });

    if (!user) {
      return res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  }

  // update user
  async updateUser(req, res) {
    const id = req.decoded.id;
    try {
      const { password, role, status, createdOn, ...data } = req.body;
      const result = await UserModel.updateOne(
        { id: id },
        {
          $set: data,
        }
      );
      console.log(result);
      if (result.acknowledge == 0) {
        res.status(204).send("User not found");
      } else {
        res.send("User updated successfully");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  // save tweet for later
  async saveTweet(req, res) {
    const userId = req.decoded.id;
    try {
      const { id } = req.body;

      const user = await UserModel.findOne({ id: userId });
      let savedTweets = user?.savedTweets;

      if (user && user.savedTweets.includes(id)) {
        savedTweets = savedTweets.filter((x) => x !== id);
      } else savedTweets?.push(id);
      console.log(id);
      const result = await UserModel.updateOne(
        { id: userId },
        {
          savedTweets: savedTweets,
        }
      );
      console.log(result);
      if (result.acknowledge == 0 || !user) {
        res.status(204).send("unable to find tweet/user");
      } else {
        res.send("Tweet Added");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  // delete user
  async deleteUser(req, res) {
    const id = req.params.id;

    const result = await UserModel.updateOne(
      { id: id },
      { $set: { status: false } }
    );

    if (result.length == 0) {
      return res.status(404).send("User not found");
    } else {
      return res.send("User deleted successfully");
    }
  }

  async getSavedTweets (req, res){
    const userId = req.decoded.id;
    const tweets = await UserModel.aggregate(
      {$match: { id:userId } },
      {
        $lookup: {
          from: "tweets",
          localField: "savedTweets",
          foreignField: "id",
          as: "tweets",
        },
      },
      { $unwind: "$tweets" },
    )
  }

  // update password
  async updatePassword(req, res) {
    const id = req.params.id;

    const passwords = {
      oldPassword: req.body.oldPassword,
      newPassword: req.body.newPassword,
    };

    const user = await UserModel.findOne({ id: id });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const validPassword = await bcrypt.compare(
      passwords.oldPassword,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send("Invalid old password");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwords.newPassword, salt);

    user.password = hashedPassword;

    let result = await user.save();
    res.send("Password updated successfully");
  }
};

// module.exports = UserDomain;
