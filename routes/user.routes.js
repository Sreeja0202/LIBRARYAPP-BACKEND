const express = require("express");
const cors = require("cors");
const userRoutes = express.Router();
const User = require("../models/user.model.js");
const app = new express();

app.use(cors());

// Adding user to db

userRoutes.post("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");

  let user = new User({
    fname: req.body.fname,
    femail: req.body.femail,
    fpassword: req.body.fpassword,
  });
  user.save((err, doc) => {
    if (err) {
      console.log("Error in Posting Data", +err);
    } else {
      res.send(doc);
    }
  });
});

// getting user list from db

userRoutes.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");

  User.find((err, doc) => {
    if (err) {
      console.log("Error in Getting Data", +err);
    } else {
      res.send(doc);
    }
  });
});

module.exports = userRoutes;
