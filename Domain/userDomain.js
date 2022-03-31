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
          let token = jwt.sign(user, process.env.secretKey, {
            expiresIn: "15d",
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
      const user = new UserModel(userdata);

      await user.save();

      res.send("User Added");
    } catch (err) {
      if (err.code == 11000) {
        res.status(209).send("Id already exists");
      } else {
        res.status(208).send(err.message);
      }
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
        const {password, role, status,createdOn, ...data} = req.body
      const result = await UserModel.updateOne(
        { id: id },
        {
          $set: data,
        }
      );
      console.log(result)
      if (result.acknowledge == 0) {
        res.send("User not found");
      } else {
        res.send("User updated successfully");
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
