const express = require("express");

// controllers
const userCon = require("../controllers/userCon");

//setup
const applet = express.Router();

applet.get("/", userCon.getAllUsers);

applet.post("/signup", userCon.createUser);

applet.post("/login", userCon.logIn);

applet.post("/logout", userCon.logOut);

module.exports = applet;
