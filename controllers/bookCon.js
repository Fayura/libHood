const User = require("../models/users");
const Book = require("../models/books");

module.exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

module.exports.addBook = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.owner });
    if (user) {
      const book = await Book.create(req.body);
      res.json(book);
    } else {
      res.json({ error: "user not found" });
    }
  } catch (err) {
    res.json({ err });
  }
};

module.exports.getBook = async (req, res) => {
  const reqId = req.params.id;
  try {
    const book = await Book.findOne({ title: reqId });
    res.json(book);
  } catch (err) {
    res.json(err);
  }
};

module.exports.updateBook = (req, res) => {
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
};

module.exports.withdrawBook = (req, res) => {
  const reqId = req.params.id;
  Book.findOneAndDelete({ title: reqId }, (err, book) => {
    if (!err) {
      res.json(book);
    } else {
      res.send(err);
    }
  });
};
