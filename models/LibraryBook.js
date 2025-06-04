import mongoose from "mongoose";

const LibraryBookSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  library: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Library',
    required: true
  },
  copies: {
    type: Number,
    default: 1,
    min: 0
  }
}, {
  timestamps: true
});

LibraryBookSchema.index({ book: 1, library: 1 }, { unique: true });

const LibraryBook = mongoose.model("LibraryBook", LibraryBookSchema);

export default LibraryBook;
