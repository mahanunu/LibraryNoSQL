import mongoose from "mongoose";

const LoanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true
  },
  loanDate: {
    type: Date,
    default: Date.now
  },
  returnDate: Date,
  returned: {
    type: Boolean,
    default: false
  }
}, {
  statics: {
    async currentLoans() {
      return this.find({ returned: false });
    }
  },
  query: {
    byUser(userId) {
      return this.where({ user: userId });
    }
  }
});

LoanSchema.index({ user: 1 });
LoanSchema.index({ book: 1 });
LoanSchema.index({ returned: 1 });

LoanSchema.virtual('summary')
  .get(function () {
    return `Book ID: ${this.book} | User ID: ${this.user} | Returned: ${this.returned}`;
  });

const Loan = mongoose.model("Loan", LoanSchema);

export default Loan;
