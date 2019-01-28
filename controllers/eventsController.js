const express       = require('express');
const router        = express.Router();
const Users         = require('../models/User');
const Events        = require('../models/Event');
const Services      = require('../models/Service');
const mongoose = require('mongoose')


// Index Route
router.get('/', async (req, res) => {
    try {
        
    } catch(err){
        res.send(err)
        console.log(err)
    }
})

// New Route
router.get('/new', async (req, res) => {
    try {
        const user = await Users.findOne(req.session.username);
        const servicesNeeded = await Services.find({})
        res.render('events/new.ejs', {
            user: user,
            services: servicesNeeded 
        })
    } catch(err) { 
        res.send(err);
        console.log(err);
    }
})

// Show Route
router.get('/:id', async (req, res) => {
    try {
        const shownEvent = await Events.findById(req.params.id);
        const theHost = await Users.findOne({'events._id': req.params.id})
        const servicesNeeded = await Services.findOne({'events._id': req.params.id})
        res.render('events/show.ejs', {
            event: shownEvent,
            user: theHost,
            services: servicesNeeded
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
        const theHost = await Users.findOne({'events._id': req.params.id});
        const editServices = await Users.find({})
        // if we want to edit any info taken from the Services or User Schemas
        res.render('events/edit.ejs', {
            event: editEvent,
            user: theHost,
            services: editServices
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
        const theHost = await Users.findOne({'events._id': req.body.id})
        theHost.events.id(req.params.id).remove();
        theHost.events.push(updateEvent);
        theHost.save();
        res.redirect('/events')
    } catch(err) {
        res.send(err)
        console.log(err)
    }
})

// Create
router.post('/', async (req, res) => {
    if(req.session.logged == true) {
        try {
            const newEvent = await Events.create(req.body);
            const host = await Users.findById(req.body.userId)
            host.events.push(newEvent);
            host.save()
            res.redirect('/events');
        } catch (err) {
            res.send(err)
            console.log(err);
        }
    } else {
        req.session.message = 'You need to login to create an event';
        res.redirect('/');
    }

})

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Events.findByIdAndRemove(req.params.id);
        const foundHost = await Users.findOne({'events._id': req.params.id});
        foundHost.events.id(req.params.id).remove();
        foundHost.save();
        res.redirect('/events')
    } catch(err) {
        res.send(err)
        console.log(err)
    }
})


module.exports = router;