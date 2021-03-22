// dependencies
const bookCon = require("../controllers/bookCon");
const express = require("express");
const tokenCheck = require("../middleware/token");

// router
const applet = express.Router();

// routes
applet.get("/", bookCon.getBooks);
applet.post("/", tokenCheck.auth, bookCon.addBook);
applet.get("/:id", bookCon.getBook);
applet.put("/:id", tokenCheck.auth, bookCon.updateBook);
applet.delete("/:id", tokenCheck.auth, bookCon.withdrawBook);

// router export
module.exports = applet;
