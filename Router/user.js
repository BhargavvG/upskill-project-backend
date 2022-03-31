const express = require("express");
const router = express.Router();
const UserDomain = require("../Domain/userDomain");
let user = new UserDomain();

router
  .post("/signup", user.addUser)
  .post("/login", user.loginUser)
  .get("/profile", user.getUserProfile)
  .put("/profile/update", user.updateUser)
  .put("/profile/updatepassword", user.updatePassword)
  .get("/profile/all", user.getAllUsers)
  .delete("/profile/:userName", user.deleteUser);
  
module.exports = router;
