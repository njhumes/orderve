const mongoose = require('mongoose');
const Events = require('./Event');
const Services = require('./Service');

const userSchema = mongoose.Schema({
    username: {type: String, unique: true , required: true} ,
    password: {type: String, required: true} ,
    firstname: String,
    lastname: String,
    email: String,
    events: [Events.schema],
    yourServices: [Services.schema],
    location: String,
    image: String
});

module.exports = mongoose.model('User', userSchema);