const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
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
});

module.exports = mongoose.model('Loan', LoanSchema); 