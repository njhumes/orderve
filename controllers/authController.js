const express = require('express');
const router  = express.Router();
const User    = require('../models/User');
const bcrypt  = require('bcryptjs');

// Create Route
router.post('/register', async (req, res) => {

  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const userDbEntry = {};
  userDbEntry.username = req.body.username;
  userDbEntry.email = req.body.email;
  userDbEntry.password = hashedPassword;

  try {
    const createdUser = await User.create(userDbEntry);
    const thisUser = await User.findOne({username: createdUser.username});
    userID = thisUser._id;

    req.session.username = createdUser.username;
    req.session.logged = true;
    req.session.userId = createdUser._id;

    res.redirect('/users/' + userID);

  } catch (err){
    res.send(err);
  }
  
});

// Login
router.post('/login', async (req, res) => {

  try {

    const foundUser = await User.findOne({username: req.body.username});

    if (foundUser){
      if (bcrypt.comepareSync(req.body.password, foundUser.password)) {

        req.session.message = '';
        req.session.username = foundUser.username;
        req.session.logged = true;
        req.session.userId = createdUser._id;

        res.redirect('/authors');

      } else {
        req.session.message = 'Username or password is incorrect';
        res.redirect('/loginPage');
      }
    } else {
      req.session.message = 'Username or password is incorrect';
      res.redirect('/loginPage');
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
    res.render('auth/login.ejs');
});

// New Registration Page
router.get('/registerPage', (req, res) => {
    res.render('auth/register.ejs');
});

module.exports = router;