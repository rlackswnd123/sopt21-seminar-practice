const express = require('express');
const router = express.Router();
const news = require('./news/index');
const bookmark = require('./bookmark');
const list = require('./list');

router.use('/news',news);
router.use('/bookmark',bookmark);
router.use('/list',list);

module.exports = router;
