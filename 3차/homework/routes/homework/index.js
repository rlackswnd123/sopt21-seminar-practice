var express = require('express');
var router = express.Router();
var echo = require('./echo');
var signupdemo = require('./signupdemo');

router.use('/echo',echo);
router.use('/signupdemo',signupdemo);

module.exports = router;
