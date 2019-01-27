const express       = require('express');
const router        = express.Router();
const Users         = require('../models/User');
const Events        = require('../models/Event');
const Services      = require('../models/Service');
const mongoose = require('mongoose')


// Index Route
router.get('/', async (req, res) => {
    try {
        const allEvents = await Events.find({});
        // May need info from Users/Services schema if we want to display that information on the index
        // Or we don't need to necessarily and just display the basic event info on the index page
        res.render('events/index.ejs', {
        events: allEvents
        })
    } catch(err){
        res.send(err)
        console.log(err)
    }
})

// New Route
router.get('/new', async (req, res) => {
    try {
        res.render('events/new.ejs')
    } catch(err) { 
        res.send(err);
        console.log(err);
    }
})

// Show Route
router.get('/:id', async (req, res) => {
    try {
        const shownEvent = await Events.findById(req.params.id);
        // Will need info from Users/Servies to properly dispaly all the data
        res.render('events/show.ejs', {
            event: shownEvent
        })
    } catch(err) {
        res.send(err)
        console.log(err)
    }
})

// Edit Route
router.get('/:id/edit', async (req, res) => {
    try {
        const editEvent = await Events.findById(req.params.id);
        // if we want to edit any info taken from the Services or User Schemas
        res.render('events/edit.ejs', {
            event: editEvent
        })
    } catch(err) {
        res.send(err);
        console.log(err)
    }
})

// Update
router.put('/:id', async (req, res) => {
    try {
        const updateEvent = await Events.findByIdAndUpdate(req.params.id, req.body, {new: true})
        // Will have to update user here as well to update their hosted events
        res.redirect('/events')
    } catch(err) {
        res.send(err)
        console.log(err)
    }
})

// Create
router.post('/', async (req, res) => {
    try {
        const newEvent = await Events.create(req.body);
        // Add user info from user schema to add the new event to their list
    res.redirect('/events');
    } catch(err) {
        res.send(err)
        console.log(err);
    }
})

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Events.findByIdAndRemove(req.params.id);
        // add user info from schema to remove this event from their list
        res.redirect('/events')
    } catch(err) {
        res.send(err)
        console.log(err)
    }
})


module.exports = router;