const express = require("express");
const bookRoutes = express.Router();
const cors = require("cors");
const Book = require("../models/book.model.js");
const app = new express();
const objectId = require("mongoose").Types.ObjectId;

app.use(cors);

// Adding a book to db

bookRoutes.post("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");

  const book = new Book({
    bname: req.body.bname,
    bauthor: req.body.bauthor,
    bdate: req.body.bdate,
    bcategory: req.body.bcategory,
  });

  book.save((err, doc) => {
    if (err) {
      console.log("Error in posting data", +err);
    } else {
      res.send(doc);
    }
  });
});

// Getting all books

bookRoutes.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");

  Book.find((err, doc) => {
    if (err) {
      console.log("Error in getting data", +err);
    } else {
      res.send(doc);
    }
  });
});

// getting details of single book

bookRoutes.get("/:id", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");

  if (objectId.isValid(req.params.id)) {
    Book.findById(req.params.id, (err, doc) => {
      if (err) {
        console.log("Error in getting data by id", +err);
      } else {
        res.send(doc);
      }
    });
  } else {
    return res.status(400).send(`No Book found with id ${req.params.id}`);
  }
});

// updating a book

bookRoutes.put("/:id", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");

  if (objectId.isValid(req.params.id)) {
    let book = {
      bname: req.body.bname,
      bauthor: req.body.bauthor,
      bdate: req.body.bdate,
      bcategory: req.body.bcategory,
    };
    Book.findByIdAndUpdate(
      req.params.id,
      { $set: book },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("Error in updating details of a book", +err);
        } else {
          res.send(doc);
        }
      }
    );
  } else {
    return res.status(400).send(`No Book found with id ${req.params.id}`);
  }
});

// Deleting a book

bookRoutes.delete("/:id", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");

  if (objectId.isValid(req.params.id)) {
    Book.findByIdAndRemove(req.params.id, (err, doc) => {
      if (err) {
        console.log("Error in getting data by id", +err);
      } else {
        res.send(doc);
      }
    });
  } else {
    return res.status(400).send(`No Book found with id ${req.params.id}`);
  }
});

module.exports = bookRoutes;
