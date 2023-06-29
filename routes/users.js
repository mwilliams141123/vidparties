const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
<<<<<<< HEAD
=======
const nodemailer = require('nodemailer');
>>>>>>> b3dd29178d92ba82d65cc483cace506b4525cb7b
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');

// Load Models
const User = require('../models/User');
<<<<<<< HEAD
const Video = require('../models/Video');
=======
>>>>>>> b3dd29178d92ba82d65cc483cace506b4525cb7b

// Log In Page
router.get('/login', forwardAuthenticated, (req, res) => {
    res.render('login', {
        title: 'Log In',
        logUser: ""
    });
});

// Log In Function
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
});

<<<<<<< HEAD
// Logout Function
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

=======
>>>>>>> b3dd29178d92ba82d65cc483cace506b4525cb7b
// Sign Up Page
router.get('/signup', forwardAuthenticated, (req, res) => {
    res.render('signup', {
        title: 'Create An Account',
        logUser: ""
    });
});

// Sign Up Function
router.post('/signup', (req, res) => {
    const { firstname, lastname, email, username, pass, pass2, gender, country, birthday } = req.body;
    let errors = [];

    if(!firstname || !lastname || !email || !username || !pass || !pass2 || !gender || !country || !birthday) {
        errors.push({ msg: "All fields required" });
    } 
    if(pass != pass2) {
        errors.push({ msg: "Your password fields do not match" });
    } 
    if (pass.length < 7) {
        errors.push({ msg: 'Passwords Should Be 7 Characters Or More' });
    } 
    if (username.length < 3 || username.length > 32) {
        errors.push({ msg: 'Usernames Should Be 3-32 Characters' });
    } 
    if(errors.length > 0) {
        res.render('signup', {
            title: 'Create An Account',
            logUser: "",
            errors: errors
        });
    } else {
        User.findOne({ email: email }).then(user => {
            res
            if(user) {
                errors.push({ msg: "Email Already Exists" });
                res.render('signup', {
                    title: 'Create An Account',
                    logUser: "",
                    errors: errors
                });
            } else {
                User.findOne({ username: username }).then(isUser => {
                    if(isUser) {
                        errors.push({ msg: "Username already exists" });
                        res.render('signup', {
                            title: 'Create An Account',
                            logUser: "",
                            errors: errors
                        });
                    } else {
                        let newUser = new User({
                            firstname: firstname,
                            lastname: lastname,
                            email: email,
                            username: username,
                            password: pass,
                            gender: gender,
                            country: country,
                            birthday: birthday
                        });

                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err;
                                newUser.password = hash;
                                newUser
                                    .save()
                                    .then(user => {
                                        const dir = './public/uploads/' + newUser.username;
                                        fs.mkdir(dir, (err) => {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                req.flash(
                                                    'success_msg',
                                                    'You are now registered and can log in'
                                                );
                                                res.redirect('/users/login');
                                            }
                                        });
                                    })
                                    .catch(err => console.log(err));
                            });
                        });
                    }
                });
            }
        });
    }

});

<<<<<<< HEAD
// Studio Page
router.get('/studio', ensureAuthenticated, (req, res) => {
    Video.find({ author: req.user.username }, (err, videos) => {
        if(err) {
            console.log(err);
        } else {
            res.render('dashboard', {
                title: 'VidParties',
                logUser: req.user,
                videos: videos
            });
        }
=======
// Dashboard Page
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {
        title: 'VidParties',
        logUser: req.user
>>>>>>> b3dd29178d92ba82d65cc483cace506b4525cb7b
    });
});

// Profile Page
router.get('/:id', ensureAuthenticated, (req, res) => {
    User.findOne({ username: req.params.id }, (err, user) => {
        if(err) {
            console.log(err);
        } else {
            res.render('profile', {
                title: user.firstname + ' ' + user.lastname,
                logUser: req.user,
                user: user
            });
        }
    });
});

// Edit Profile Page

module.exports = router;