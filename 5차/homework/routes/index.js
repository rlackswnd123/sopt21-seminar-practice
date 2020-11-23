var express = require('express');
var router = express.Router();
const signin = require('./signin');
const signup = require('./signup');
const day = require('./day');

router.use('/signin',signin);
router.use('/signup',signup);
router.use('/day',day);

module.exports = router;
