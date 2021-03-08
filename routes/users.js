const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//models
const User = require("../models/users");

//setup
const applet = express.Router();

applet.get("/", async (req, res) => {
  const user = await User.find({});
  if (user) {
    res.json(user);
  }
});

applet.post("/signup", async (req, res) => {
  console.log(req.body.username, req.body.password);
  const hash = await bcrypt.hash(req.body.password, 10);
  if (hash) {
    console.log(hash);
    const user = await User.create({
      username: req.body.username,
      password: hash,
    });
    const token = await jwt.sign(
      { id: user._id },
      "Its so cold outside,I'm alone,I'm alright"
    );
    res.cookie("jwt", token, {
      httpOnly: true,
    });
    res.status(201).send("SUCCESS");
  } else {
    res.status(500).send("FAILURE");
  }
});

applet.post("/login", async (req, res) => {
  const username = req.body.username;
  const user = await User.findOne({ username: username });
  const auth = await bcrypt.compare(req.body.password, user.password);
  if (auth) {
    const token = await jwt.sign(
      { id: user._id },
      "Its so cold outside,I'm alone,I'm alright"
    );
    res.cookie("jwt", token, {
      httpOnly: true,
    });
    res.json({ login: "SUCCESS" });
  } else {
    res.json({ login: "FAILURE" });
  }
});

module.exports = applet;
