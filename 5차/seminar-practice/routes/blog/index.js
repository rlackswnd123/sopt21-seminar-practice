const express = require('express');
const router = express.Router();

const blog_1 = require('./blog1');
const blog_2 = require('./blog2');

router.use('/name1', blog_1);
router.use('/name2', blog_2);

router.get('/', (req, res) => {
	res.status(200).send({
		msg : "OK"
	});
});


module.exports = router;