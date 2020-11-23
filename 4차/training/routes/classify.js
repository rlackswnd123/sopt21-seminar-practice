const express = require('express');
const router = express.Router();
const async = require('async');
const pool = require('../config/dbPool');

router.get('/:attendance', (req, res) => {
	let taskArray = [
		(callback) => {
			pool.getConnection((err, connection) => {
				if(err){
					res.status(500).send({
						stat : "fail",
						msg : "DB connection error"
					});
					callback("DB connection err : " + err);
				} else callback(null, connection);
			});
		},
		(connection, callback) => {
			let selectAtdQuery = 'select movie_title from movies where movie_attendance > ?';
			connection.query(selectAtdQuery, req.params.attendance, (err, data) => {
				if(err){
					res.status(500).send({
						stat : "fail",
						msg : "DB connection error"
					});
					connection.release();
					callback("select attendance query error : "+ err);
				} else{
					res.status(200).send({
						stat : "success",
						data : data,
						msg : "successful loading"
					});
					connection.release();
					callback(null, "successful loading");
				}
			});
		}
	];
	async.waterfall(taskArray , (err, result)=> {
		if(err) console.log(err);
		else console.log(result);
	});
});

module.exports = router;