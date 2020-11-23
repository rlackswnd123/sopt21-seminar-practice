const express = require('express');
const router = express.Router();

const list = require('./getFile');
const write = require('./postFile');

router.use('/list', list);
router.use('/write', write);

module.exports = router;