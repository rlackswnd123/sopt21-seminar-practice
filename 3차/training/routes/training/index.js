var express = require('express');
var router = express.Router();

const first = require('./first');

router.use('/first',first);

module.exports = router;
