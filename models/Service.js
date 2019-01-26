const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    title: {type: String, required: true},
    images: [{type: String}],
    about: String
});

module.exports = mongoose.model('Service', serviceSchema);