import express from "express";
import {
  getBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
  getBookSummary,
  updateBookSummary,
  countByType,
  countPerType,
  findByName,
  isBaseBook
} from "../controllers/BookController.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", createBook);

router.get("/summary/:id", getBookSummary);
router.put("/summary/:id", updateBookSummary);
router.get("/count/type/:type", countByType);
router.get("/count/per-type", countPerType);
router.get("/search/by-name", findByName);
router.get("/is-base/:id", isBaseBook);

router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;