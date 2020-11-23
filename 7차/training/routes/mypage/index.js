const express = require('express');
const router = express.Router();
const bookmark = require('./bookmark');

router.use('/bookmark',bookmark);

module.exports = router;
