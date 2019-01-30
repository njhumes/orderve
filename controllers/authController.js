const express = require('express');
const router  = express.Router();
const User    = require('../models/User');
const bcrypt  = require('bcryptjs');

// Create Route
router.post('/register', async (req, res) => {
  console.log('got to the auth/register');
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const userDbEntry = {};
  userDbEntry.username = req.body.username;
  userDbEntry.email = req.body.email;
  userDbEntry.password = hashedPassword;
  userDbEntry.firstname = req.body.firstname;
  userDbEntry.lastname = req.body.lastname;
  userDbEntry.zipCode = req.body.zipCode;
  try {
    const createdUser = await User.create(userDbEntry);
    const thisUser = await User.findOne({username: createdUser.username});
    userID = thisUser._id;

    req.session.username = createdUser.username;
    req.session.logged = true;
    req.session.userId = createdUser._id;
    console.log(req.session);
    res.redirect('/users/' + userID);

  } catch (err){
    res.send(err);
  }
  
});

// Login
router.post('/login', async (req, res) => {
console.log(req.session);
  try {

    const foundUser = await User.findOne({'username': req.body.username});
    console.log(foundUser);
    console.log(req.body);
    
    if (foundUser){
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        console.log('password correct');
        req.session.message = '';
        req.session.username = foundUser.username;
        req.session.logged = true;
        req.session.userId = foundUser._id;
        console.log(req.session);
        
        res.redirect('/users/' + req.session.userId);

      } else {
        req.session.message = 'Username or password is incorrect';
        res.render('auth/login.ejs', {
          message: req.session.message
        });
      }
    } else {
      req.session.message = 'Username or password is incorrect';
      res.render('auth/login.ejs', {
        message: req.session.message
      });
    }

  } catch(err){
    res.send(err);
  }
  
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err){
      res.send(err);
    } else {
      res.redirect('/');
    }
  });
});

// New Login Page
router.get('/loginPage', (req, res) => {
    res.render('auth/login.ejs', {
      message: req.session.message
    });
});

// New Registration Page
router.get('/registerPage', (req, res) => {
    res.render('auth/register.ejs');
});

module.exports = router;