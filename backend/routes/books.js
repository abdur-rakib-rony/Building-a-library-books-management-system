const express = require("express");
const router = express.Router();

const Book = require("../models/Books");

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/", async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    isbn: req.body.isbn,
    publisher: req.body.publisher,
    inStock: req.body.inStock,
  });
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (req.body.title) {
      book.title = req.body.title;
    }

    if (req.body.author) {
      book.author = req.body.author;
    }

    if (req.body.isbn) {
      book.isbn = req.body.isbn;
    }

    if (req.body.publisher) {
      book.publisher = req.body.publisher;
    }

    if (req.body.inStock) {
      book.inStock = req.body.inStock;
    }

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Book.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
