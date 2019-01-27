const express       = require('express');
const router        = express.Router();
const Users         = require('../models/User');
const Events        = require('../models/Event');
const Services      = require('../models/Service');

// index route
//route to the services index.ejs ** for now just listing all current chefs will eventually be used to list out chefs bids ** or orderves
router.get('/', async (req,res)=>{
    try{
        res.render('services/index.ejs');
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
    // I think we should also find the current user and pass that along to the ejs file
    
    res.render('services/new.ejs');
});

// create route
router.post('/', async (req,res)=>{
    // find user based on id
    // add the service to the user's array and the service collection
    // then find the article's id
    // redirect to the users show page
});

// show route
router.get('/:id', async (req,res)=>{
    // match the id of the clicked chef/service/orderve to one in the services collection and insert into the show.ejs
    res.render('services/show.ejs');
});

//edit route
router.get('/:id/edit', async (req, res)=>{
    // find one by id based on clicked service
    // give that info to the edit page
    res.render('services/edit.ejs');
});

// put route
router.put('/:id', async (req, res)=>{
    // find one service by id and update
    // then find the user that has the service in his services array
    // set the service matching req.params.id in the users service array to the new updated service (.set() can be used as a command I think)
    // save the user in the db
    // send em to the show pagee
    res.redirect('/services/' + req.params.id);
});



module.exports = router;