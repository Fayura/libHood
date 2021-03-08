const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  author: {
    required: true,
    type: String,
  },
  owner: {
    required: true,
    type: String,
  },
  reader: {
    required: false,
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
