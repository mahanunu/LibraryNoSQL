import mongoose from "mongoose";

const LibrarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  country: {
    type: String,
    required: true
  },
  city: String,
  address: String
}, {
  statics: {
    async countByCountry(country) {
      return this.countDocuments({ country });
    },
    async countPerCountry() {
      return this.aggregate([
        { $group: { _id: "$country", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
    }
  },
  query: {
    byName(name) {
      return this.where({ name: new RegExp(name, 'i') });
    }
  }
});

LibrarySchema.index({ country: 1 });
LibrarySchema.index({ name: 1, city: 1 });

LibrarySchema.virtual('summary')
  .get(function () {
    return `${this.name} (${this.city}, ${this.country})`;
  });

const Library = mongoose.model("Library", LibrarySchema);

export default Library;
