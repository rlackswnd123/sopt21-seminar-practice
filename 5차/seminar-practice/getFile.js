const express = require('express');
const router = express.Router();

router.get('URL을 여기다 적어주세요', (req, res) => {
	res.status(200).send({
		msg : "success connect with GET method"
	});
});

module.exports = router;