const express = require('express');
const router = express.Router();

router.post('URL을 여기다 적어주세요', (req, res) => {
	res.status(200).send({
		msg : "success connect with POST method"
	});
});

module.exports = router;