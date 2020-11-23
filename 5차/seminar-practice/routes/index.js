const express = require('express');
const router = express.Router();
const blog = require('./blog/index');
const cafe = require('./cafe/index');
const news = require('./news/index');
const async = require('./async/index');

router.use('/blog', blog);
router.use('/cafe', cafe);
router.use('/news', news);
router.use('/async', async);

router.get('/', (req, res) => {
	res.status(200).send({
		msg : "OK"
	});
});

module.exports = router;
