const express = require("express");

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
applet.post("/", (req, res) => {
  console.log(req.body);
  Book.create(req.body);
  res.send("book added");
});
applet.get("/:id", (req, res) => {
  const reqId = req.params.id;
  Book.findOne({ _id: reqId }, (err, book) => {
    if (!err) {
      res.json(book);
    }
  });
});

applet.put("/:id", (req, res) => {
  const reqId = req.params.id;
  Book.findOneAndUpdate(
    { _id: reqId },
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

applet.delete("/:id", (req, res) => {
  const reqId = req.params.id;
  Book.findOneAndDelete({ _id: reqId }, (err, book) => {
    if (!err) {
      res.json(book);
    } else {
      res.send(err);
    }
  });
});
module.exports = applet;
