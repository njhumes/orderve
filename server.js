require('./db/db');
const express               = require('express');
const app                   = express();
const morgan                = require('morgan');
// const mongoose              = require('mongoose'); // Not sure if we need mongoose here
const bodyParser            = require('body-parser');
const methodOverride        = require('method-override');
const session               = require('express-session');
const port                  = 3000;

const servicesController    = require('./controllers/servicesController');
const usersController       = require('./controllers/usersController');
const eventsController      = require('./controllers/eventsController');
const authController        = require('./controllers/authController');

// session
app.use(session({
    secret: "THIS IS A RANDOM STRING SECRET",
    resave: false,
    saveUninitialized: false
}));
// other middleware
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('short'));
app.use(express.static('public'));


app.use('/users', usersController);
app.use('/services', servicesController);
app.use('/events', eventsController);
app.use('/auth', authController);

// load the first home page
app.get('/', (req,res) => {
    console.log(`loaded the first page`);
    res.render('index.ejs', {
        // use session info to identify current
        // user to go to their Show Page
    }
    );
});

// load the about page
app.get('/about', (req,res) => {
    console.log(`loaded the about page`);
    res.render('about.ejs', {
        // use session info to identify current
        // user to go to their Show Page
    }
    );
});

app.listen(port, ()=>{
    console.log(`server listening on port: ${port}`);
})