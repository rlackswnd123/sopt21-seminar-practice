var express = require('express');
var router = express.Router();
const content = require('./content');
const comment = require('./comment');

router.use('/content',content);
router.use('/comment',comment);

module.exports = router;
