var express = require('express');
var router = express.Router();
const training = require('./training/index');

router.use('/training',training);

module.exports = router;
