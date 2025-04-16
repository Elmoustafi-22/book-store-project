import express from 'express';
import Book from '../models/bookModel.js';

const router = express.Router()

router.post("/", async (request, response) => {
  try {
    const { title, author, publishYear } = request.body;

    if (!title || !author || !publishYear) {
      return response.status(400).send({
        success: false,
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const newBook = {
      title,
      author,
      publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get all books
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      success: true,
      count: books.length,
      books,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Error in fetching books",
    });
  }
});

// Route for getting a specific book using ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    return response.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

// update a specific book using ID
router.patch("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    if (!id) {
      return response.status(400).json({
        success: false,
        message: "Missing book ID",
      });
    }

    const { title, description, publishYear } = request.body;

    if (!title && !description && !publishYear) {
      return response.status(400).json({
        success: false,
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        title,
        description,
        publishYear,
      },
      { new: true }
    );

    return response.status(200).json({
      success: true,
      message: "Book updated successfully",
      updatedBook,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: `Error in updating book &{error.message}`,
    });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    if (!id) {
      return response.status(400).json({
        success: false,
        message: "Missing ID",
      });
    }

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return response.status(200).json({
      success: false,
      message: "Book deleted successfully!",
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: `Error in deleting book ${error.message}`,
    });
  }
});


export default router