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
        const host = await Users.findById(req.body.hostId);
        const servicesNeeded = await Services.find(req.body.serviceId)
        // Or we don't need to necessarily and just display the basic event info on the index page
        res.render('events/index.ejs', {
        events: allEvents,
        users: host,
        services: servicesNeeded,
        userId: req.session.userId,
        currentSession: req.session


        })
    } catch(err){
        res.send(err)
        console.log(err)
    }
})

// New Route
router.get('/new', async (req, res) => {
    try {
        console.log(req.session);
        const user = await Users.findById(req.session.userId);
        const servicesNeeded = await Services.find({})
        res.render('events/new.ejs', {
            user: user,
            services: servicesNeeded,
            userId: req.session.userId,
            currentSession: req.session

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
        //const servicesNeeded = shownEvent.servicesNeeded;
        console.log(theHost);
        console.log('=======');
        console.log(shownEvent);
        
       
        res.render('events/show.ejs', {
            event: shownEvent,
            user: theHost,
            userId: req.session.userId,
            currentSession: req.session
            //services: servicesNeeded
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
            services: editServices,
            userId: req.session.userId,
            currentSession: req.session

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
        const theHost = await Users.findOne({'events._id': req.params.id})
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
    console.log(req.session);
    if(req.session.logged == true) {
        try {
            const newEvent = await Events.create(req.body);
            const host = await Users.findById(req.session.userId)
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
        const deleted = await Events.findByIdAndDelete(req.params.id);
        const foundHost = await Users.findOne({'events._id': req.params.id});
        foundHost.events.id(req.params.id).remove();
        foundHost.save();
        res.redirect('/events');
    } catch(err) {
        res.send(err)
        console.log(err)
    }
})


module.exports = router;