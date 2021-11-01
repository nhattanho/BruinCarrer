const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/user.js");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, POST, GET");
  res.header(
    "Access-Control-Allow-Headers",
    // "Origin, X-Requested-With, Content-Type, Accept"
    "Origin, Content-Type"
  );
  next();
  // if ("OPTIONS" == req.method) {
  //   res.sendStatus(200);
  // } else {
  //   next();
  // }
});

/* Create and connect to DB */
mongoose.connect(
  process.env.DATABASE_ACCESS,
  () => console.log("Database connected"),
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to db");
});

app.use("/user", router);

/* Listening on Port */
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("listening at port", port));
