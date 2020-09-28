const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// var cookieParser = require("cookie-parser");
var passport = require("passport");

const db = require("./db");

const userRouter = require("./routes/user-router");
const postRouter = require("./routes/post-router");
const requestRouter = require("./routes/request-router");
const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
// app.use(cookieParser());

app.use(passport.initialize());
require("./config/passport")(passport);

// var multer = require("multer");
// var upload = multer();
// app.use(upload.array());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api", userRouter);
app.use("/api", postRouter);
app.use("/api", requestRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
