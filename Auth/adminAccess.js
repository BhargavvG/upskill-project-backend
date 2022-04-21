const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  if (req.decoded.role === "admin") {
    next();
  } else {
    res.status(401).json({
      Error: "Permission Denied",
      Error_Message: "You are not an Admin!",
    });
  }
});

module.exports = router;
