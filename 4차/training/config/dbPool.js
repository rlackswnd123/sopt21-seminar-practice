const mysql = require('mysql');
const dbConfig = {
	host : 'localhost',
	port : 3306,
	user : 'root',
	password : '',
	database : '',
	connectionLimit : 10 //RDS를 쓸때는 20~30이 최적화
};

module.exports = mysql.createPool(dbConfig);