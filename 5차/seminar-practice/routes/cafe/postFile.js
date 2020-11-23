const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
	res.status(200).send({
		msg : "success connect with POST method"
	});
});

module.exports = router;