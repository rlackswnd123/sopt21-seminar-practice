const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).send({
		msg : "/list success connect with GET method"
	});
});

router.get('/tag1', (req, res) => {
	res.status(200).send({
		msg : "/list/tag1  success connect with GET method"
	});
});

router.get('/tag2', (req, res) => {
	res.status(200).send({
		msg : "/list/tag2  success connect with GET method"
	});
});

router.get('/tag3', (req, res) => {
	res.status(200).send({
		msg : "/list/tag3  success connect with GET method"
	});
});

module.exports = router;