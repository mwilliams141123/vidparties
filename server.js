const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const { forwardAuthenticated, ensureAuthenticated } = require('./config/auth');

// Init App
const app = express();

// Passport Config
require('./config/passport')(passport);

// Db Config
const db = require('./config/keys').mongoURI;

// Connect To MongoDB
mongoose
    .connect(
        db,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


// View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Express Body Parser
app.use(express.urlencoded({ extended: true }));

// Express Session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Home Page
app.get("/", (req, res) => {
<<<<<<< HEAD
    if(req.user) {
        res.render('index', {
            title: "Welcome to VidParties",
            featured: "",
            logUser: req.user
        });
    } else {
        res.render('index', {
            title: "Welcome to VidParties",
            featured: "",
            logUser: ""
        });
    }
=======
    res.render('index', {
        title: "Welcome to VidParties",
        featured: ""
    });
>>>>>>> b3dd29178d92ba82d65cc483cace506b4525cb7b
});

// Routes
app.use('/users', require('./routes/users'));
<<<<<<< HEAD
app.use('/videos', require('./routes/videos'));
=======
>>>>>>> b3dd29178d92ba82d65cc483cace506b4525cb7b

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server Listening...");
});