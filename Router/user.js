const express = require("express");
const router = express.Router();
const UserDomain = require("../Domain/userDomain");
let user = new UserDomain();
const loginMiddleware = require("../middleware/login");
const authAdmin = require("../Auth/adminAccess");

router
  .post("/signup", user.addUser)
  .post("/login", user.loginUser)
  .use(loginMiddleware)
  .get("/profile", user.getUserProfile)
  .put("/profile/update", user.updateUser)
  .put("/profile/updatepassword", user.updatePassword)
  .use(authAdmin)
  .get("/profile/all", user.getAllUsers)
  .delete("/profile/:id", user.deleteUser);

module.exports = router;
