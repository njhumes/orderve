const mongoose = require('mongoose');
const Services = require('./Service')
const User = require('./User')

const eventSchema = mongoose.Schema({
    title: {type: String, require: true},
    location: {type: String, require: true},
    date: {type: Date, require: true},
    description: {type: String, require: true},
    services: [Services.schema], // TBD if we need this imported or if this will just be a drop down
<<<<<<< HEAD
    // host: [Users.schema],
=======
    // host: [User.schema],
>>>>>>> master
    budget: Number,
})

const Event = mongoose.model('Event', eventSchema)
module.exports = Event;

