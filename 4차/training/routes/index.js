var express = require('express');
var router = express.Router();
var classify = require('./classify');

router.use('/classify',classify);

module.exports = router;
