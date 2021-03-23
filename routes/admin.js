const express = require("express");
// controllers
const adminCon = require("../controllers/adminCon");

//setup
const applet = express.Router();

applet.post("/signup", adminCon.createadmin);

applet.post("/login", adminCon.logIn);

module.exports = applet;
