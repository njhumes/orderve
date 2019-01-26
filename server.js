require('./db/db');
const express               = require('express');
const app                   = express();
const morgan                = require('morgan');
const mongoose              = require('mongoose');
const bodyParser            = require('body-parser');
const methodOverride        = require('method-override');
const session               = require('express-session');
const port                  = 3000;

const servicesController    = require('./controllers/servicesController');
const usersController       = require('./controllers/usersController');
const eventsController      = require('./controllers/eventsController');

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

// load the first home page at /
app.get('/', (req,res) => {
    console.log(`loaded the first page`);
    res.render('index.ejs');
    
});

app.listen(port, ()=>{
    console.log(`server listening on port: ${port}`);
})