var express = require('express');
var router = express.Router();
var async = require('./async');
var promise = require('./promise');

router.use('/async',async);
router.use('/promise',promise);

module.exports = router;
