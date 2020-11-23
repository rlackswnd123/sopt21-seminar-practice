const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).send({
		msg : "OK"
	});
});


router.get('/aaa', (req, res) => {
	res.status(200).send({
		msg : "blog/name2/aaa  success connect with GET method"
	});
});

module.exports = router;