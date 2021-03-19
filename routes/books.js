const express = require("express");
const tokenCheck = require("../middleware/token");

//models
const Book = require("../models/books");

const applet = express.Router();

applet.get("/", (req, res) => {
  Book.find({}, (err, books) => {
    if (!err) {
      res.json(books);
    }
  });
});
applet.post("/", tokenCheck.auth, async (req, res) => {
  console.log(req.body);
  const book = await Book.create(req.body);
  if (book) res.json(book);
  else res.json({ status: "ACCESS DENIED" });
});
applet.get("/:id", (req, res) => {
  const reqId = req.params.id;
  Book.findOne({ title: reqId }, (err, book) => {
    if (!err) {
      res.json(book);
    }
  });
});

applet.put("/:id", tokenCheck.auth, (req, res) => {
  const reqId = req.params.id;
  Book.findOneAndUpdate(
    { title: reqId },
    {
      $set: {
        title: req.body.title,
        author: req.body.author,
        owner: req.body.owner,
        reader: req.body.reader,
      },
    },
    { upsert: true },
    (err, book) => {
      if (!err) {
        res.json(book);
      } else {
        res.send(err);
      }
    }
  );
});

applet.delete("/:id", tokenCheck.auth, (req, res) => {
  const reqId = req.params.id;
  Book.findOneAndDelete({ title: reqId }, (err, book) => {
    if (!err) {
      res.json(book);
    } else {
      res.send(err);
    }
  });
});
module.exports = applet;
