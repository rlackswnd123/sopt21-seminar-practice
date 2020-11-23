const express = require('express');
const router = express.Router();
const board = require('./board/index');
const mypage = require('./mypage/index');
const signin = require('./signin');
const signup = require('./signup');

router.use('/board',board);
router.use('/mypage',mypage);
router.use('/signin',signin);
router.use('/signup',signup);

module.exports = router;
