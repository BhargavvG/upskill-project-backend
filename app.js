const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./Router/user");

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

const port = process.env.PORT || process.env.PORT + 1 || 8080;
app.listen(port, () => {
  console.log(`server is runing on port ${port} ...`);
});
module.exports = app;
