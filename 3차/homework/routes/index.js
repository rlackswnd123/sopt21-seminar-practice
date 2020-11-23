var express = require('express');
var router = express.Router();
var homework = require('./homework/index');
var flowcontrol = require('./flowcontrol/index');

router.use('/homework',homework);
router.use('/flowcontrol',flowcontrol);

module.exports = router;
