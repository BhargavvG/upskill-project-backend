const express = require("express");
const router = express.Router();
const UserDomain = require("../Domain/userDomain");
let user = new UserDomain();

router
  .post("/signup", user.addUser)
  .post("/login", user.loginUser)
  .put("/forgotpassword", user.forgotPassword)
  .put("/verify/:email/:otp", user.verifyOtp)
  .put("/resetpassword/:email/:otp", user.resetPassword)
  .get("/profile", user.getUserProfile)
  .put("/profile/update", user.updateUser)
  .put("/profile/updatepassword", user.updatePassword)
  .get("/profile/all", user.getAllUsers)
  .get("/profile/:email", user.getuserByEmail)
  .delete("/profile/:userName", user.deleteUser);

module.exports = router;
