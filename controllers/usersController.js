const express       = require('express');
const router        = express.Router();
const bcrypt        = require('bcryptjs');
const Users         = require('../models/User');
const Events        = require('../models/Event');
const Services      = require('../models/Service');

// index route
router.get('/', async (req,res)=>{
    try{
        // EXCLUDE YOUR ACCOUNT ON INDEX
        const allUsers = await Users.find({ _id: { $ne: req.session.userId } });
        
        res.render('users/index.ejs', {
            users: allUsers, 
            userId: req.session.userId,
            currentSession: req.session
        }
        );
    } catch(err){
        res.send(err);
    }
});

// new route (does registration take care of this?)
router.get('/new', (req,res)=>{
    // Make your profile
    // res.render('users/new.ejs');
});

// create route (does registration take care of this?)
router.post('/', async (req,res)=>{
    // Submit your new profile
    // MONGO: .create(req.body)
    // Redirect to your Show Page
});

// show route
router.get('/:id', async (req,res)=>{

    try{
        console.log(req.session);
        const clickedUser = await Users.findById({ _id: req.params.id });

        res.render('users/show.ejs', {
            user: clickedUser,
            currentUserId: req.session.userId,
            currentSession: req.session
        });
    } catch(err){
        res.send(err);
    }
    
});

//edit route
router.get('/:id/edit', async (req, res)=>{
    
    try{
        const thisUser = await Users.findById({ _id: req.session.userId });

        res.render('users/edit.ejs', {
            user: thisUser,
            currentSession: req.session
        });
    } catch(err){
        res.send(err);
    }
    
});

// put route
router.put('/:id', async (req, res)=>{

    try{
        // req.body *may* need to be restructured if errors
        const updatedUser = await Users.findByIdAndUpdate(req.params.id , req.body);

        res.redirect('/users/' + req.params.id);
    } catch(err){
        res.send(err);
    }
    
});

// delete route
router.delete('/:id', async (req,res) => {
    
    try{
        const deletedUser = await Users.findByIdAndRemove(req.params.id);
        let eventIds = [];

        for (let i = 0; i < deletedUser.events.length; i++) {
           eventIds.push(deletedUser.events[i]._id);
        }

        await Events.deleteMany({ _id: { $in: eventIds } });

        res.redirect('/');
    } catch(err){
        res.send(err);
    }

});


module.exports = router;