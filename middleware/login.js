const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.use([express.json()], (req, res, next) => {
  let token = req.headers["access-token"];
  //   console.log(token);

  jwt.verify(
    token,
    process.env.SECRETKEY,
    { algorithm: process.env.ALGORITHM },
    (err, decoded) => {
      if (err) {
        return res.status(401).json({
          Error: "Unauthorized Access",
          Error_Message: `${err.message}`,
        });
      }
      req.decoded = decoded._doc;
      //   console.log(decoded._doc);
      next();
    }
  );
});

module.exports = router;
