const mongoose = require("mongoose");
const Book = mongoose.model("book", {
  bname: {
    type: String,
  },
  bauthor: {
    type: String,
  },
  bdate: {
    type: String,
  },
  bcategory: {
    type: String,
  },
});

module.exports = Book;
