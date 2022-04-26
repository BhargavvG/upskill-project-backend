const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./Router/user");
const tweetRouter = require("./Router/tweet");
const channelRouter = require("./Router/channel");
const loginMiddleware = require("./middleware/login");
const authAdmin = require("./Auth/adminAccess");

dotenv.config();
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log(err.message);
    console.log("Connection to DB faced some Error, Please Restart Server");
  });

app.use(cors());
app.get("/", (req, res) => {
  res.send("Server is live !");
});
app.use(express.json());
app.use("/user", userRouter);
app.use("/channel", channelRouter);
app.use(loginMiddleware);
app.use("/tweet", tweetRouter);

const port = process.env.PORT || 8080;
try {
  app.listen(port, () => {
    console.log(`server is runing on port ${port} ...`);
  });
} catch (err) {
  console.log(err);
}
module.exports = app;
