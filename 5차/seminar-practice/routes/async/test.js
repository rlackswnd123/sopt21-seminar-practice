const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const async = require('async');
const pool = require('../../config/dbPool');

router.put('/', (req, res)=>{
	let functionArray =[
		function(callback){
			pool.getConnection(function(err, connection){
				if(err){
					callback(err);
				} else{
					callback(null, connection);
				}
			});
		},
		function(connection, callback){
			let insertQuery = 'insert into test values(?,?)';
			connection.query(insertQuery, [null, req.body.content], (err) =>{
				if(err){
					res.status(500).send({
						msg : "fail"
					});
					connection.release();
					callback(err);
				} else{
					callback(null, connection);
				}
			});
		},
		function(connection, callback){
			let selectQuery = 'select * from test';
			connection.query(selectQuery, (err, data)=>{
				if(err){
					res.status(500).send({
						msg : "fail"
					});
					connection.release();
					callback(err);
				} else{
					res.status(201).send({
						msg : "success",
						contents : data
					});
					connection.release();
					callback(null, "successful insert and select data");
				}
			})
		}
	];
	async.waterfall(functionArray, function(err, result) {
		if(err){
			console.log("err : " + err);
		} else{
			console.log(result);
		}
	});
})


module.exports = router;