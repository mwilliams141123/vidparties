const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');

// Load Models
const User = require('../models/User');
const Video = require('../models/Video');

// Upload Page
router.get('/upload', ensureAuthenticated, (req, res) => {
    res.render('upload', {
        title: 'Upload A New Video',
        logUser: req.user
    });
});

module.exports = router;