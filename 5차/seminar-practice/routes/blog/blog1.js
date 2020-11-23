const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).send({
		msg : "blog/name1/   success connect with GET method"
	});
});

module.exports = router;