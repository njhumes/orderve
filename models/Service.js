const mongoose = require('mongoose');
const Bids = require('./Bid');

const serviceSchema = mongoose.Schema({
    title: {type: String, required: true},
    images: [{type: String}],
    about: String,
    bids: [Bids.schema]
});

module.exports = mongoose.model('Service', serviceSchema);