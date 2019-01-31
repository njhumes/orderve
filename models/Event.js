const mongoose = require('mongoose');
const Services = require('./Service')
const User = require('./User')

const eventSchema = mongoose.Schema({
    title: {type: String, require: true},
    location: {type: String, require: true},
    date: {type: Date},
    description: {type: String, require: true},
    services: [Services.schema], // TBD if we need this imported or if this will just be a drop down
    // hostId: String,
    servicesNeeded: String,
    budget: Number,
    image: String
})

const Event = mongoose.model('Event', eventSchema)
module.exports = Event;

