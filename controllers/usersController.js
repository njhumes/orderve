const express       = require('express');
const router        = express.Router();
const bcrypt        = require('bcryptjs');
const Users         = require('../models/User');
const Events        = require('../models/Event');
const Services      = require('../models/Service');

// index route
router.get('/', async (req,res)=>{
    try{
        res.render('users/index.ejs');
        // Show all users (chefs) to hire
        // MONGO: .find() and list out
    }catch(err){
        res.send(err);
    }
});

// new route
router.get('/new', (req,res)=>{
    // Make your profile
    
    res.render('users/new.ejs');
});

// create route
router.post('/', async (req,res)=>{
    // Submit your new profile
    // MONGO: .create(req.body)
    // Redirect to your Show Page
});

// show route
router.get('/:id', async (req,res)=>{
    // Go to your Show Page (Login/Register if session not logged-in)
    // MONGO: verify user._id from session info and show that info
    res.render('users/show.ejs');
});

//edit route
router.get('/:id/edit', async (req, res)=>{
    // 
    res.render('users/edit.ejs');
});

// put route
router.put('/:id', async (req, res)=>{
    // 
    res.redirect('/users/' + req.params.id);
});


module.exports = router;