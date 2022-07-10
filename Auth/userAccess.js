const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  if (req.decoded.role === "admin" || req.decoded.role === "user") {
    next();
  } else {
    res.status(401).json({
      Error: "Permission Denied",
      Error_Message: "Authorization failed!",
    });
  }
});

module.exports = router;
