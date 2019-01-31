const mongoose = require('mongoose');

const bidSchema = mongoose.Schema({
    title: {type: String, required: true},
    bidAmount: {type: Number, required: true},
    note: String
});

module.exports = mongoose.model('Bid', bidSchema);