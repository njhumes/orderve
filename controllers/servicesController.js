const express       = require('express');
const router        = express.Router();
const Users         = require('../models/User');
const Events        = require('../models/Event');
const Services      = require('../models/Service');

// index route
//route to the services index.ejs ** for now just listing all current chefs will eventually be used to list out chefs bids ** or orderves
router.get('/', async (req,res)=>{
    try{
        res.render('/services/index.ejs');
        // going to have to find all the services (or chefs) that have "made a bid" on a specific event
        // for each chef or service we need to see if it is in the current users events.
        // if they are then put em into a new array which we will pass to the ejs file
    }catch(err){
        res.send(err);
    }
});

// new route
router.get('/new', (req,res)=>{
    //straight up route to the new.ejs when the user wants to create a new service/chef/orderve
    res.render('/services/new.ejs');
})

// show route
router.get('/:id', async (req,res)=>{
    // match the id of the clicked chef/service/orderve to one in the services collection and insert into the show.ejs
    res.render('/services/show.ejs');
})


module.exports = router;